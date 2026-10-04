"use client";

import { useState } from "react";
import { importUsers } from "@/app/actions/userActions";
import toast from "react-hot-toast";

export default function ImportUser() {
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const processCSV = async () => {
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const lines = text.split(/\r?\n/);
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const data = lines.slice(1).filter(line => line.trim() !== '').map(line => {
        const values = line.split(',');
        const obj: any = {};
        headers.forEach((header, i) => {
          obj[header] = values[i]?.trim();
        });
        return obj;
      });

      const result = await importUsers(data);
      
      if (result.success) {
        toast.success(result.message);
        if (result.details && result.details.length > 0) {
            console.warn("Import details:", result.details);
        }
      } else {
        toast.error(result.error || "Gagal import");
      }
      setIsImporting(false);
      setFile(null);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn btn-outline btn-sm gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Import CSV
      </button>

      {isOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-base-100 border border-primary/20 shadow-2xl max-w-md">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="text-primary">📥</span> Import Pengguna dari CSV
            </h3>
            <p className="py-2 text-xs text-slate-400">
              Unggah file CSV dengan kolom header berikut:
            </p>
            <div className="bg-base-200/80 p-2.5 rounded-lg border border-primary/10 text-xs font-mono text-cyan-300 break-all select-all">
              username,password,fullName,department,groupname
            </div>

            <div className="mt-4 space-y-3">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="file-input file-input-bordered file-input-primary file-input-sm w-full"
              />

              {file && (
                <p className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <span>✓</span> File siap: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setFile(null);
                }}
                disabled={isImporting}
                className="btn btn-ghost btn-sm"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={processCSV}
                disabled={!file || isImporting}
                className="btn btn-primary btn-sm gap-2"
              >
                {isImporting ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Memproses...
                  </>
                ) : (
                  "Mulai Import"
                )}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => !isImporting && setIsOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
