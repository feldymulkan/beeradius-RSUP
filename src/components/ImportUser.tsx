"use client";

import { useState } from "react";
import { importUsers } from "@/app/actions/userActions";
import toast from "react-hot-toast";

export default function ImportUser() {
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);

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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input 
          type="file" 
          accept=".csv"
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-sm w-full max-w-xs" 
        />
        <button 
          onClick={processCSV}
          disabled={!file || isImporting}
          className={`btn btn-sm btn-secondary ${isImporting ? 'loading' : ''}`}
        >
          {isImporting ? 'Importing...' : 'Upload CSV'}
        </button>
      </div>
      <p className="text-[10px] text-gray-400">
        Format CSV: username,password,fullName,department,groupname
      </p>
    </div>
  );
}
