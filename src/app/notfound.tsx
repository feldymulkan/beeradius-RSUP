export default function NotFound() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6 text-2xl">
            Halaman Tidak Ditemukan
          </p>
          <p className="mb-6">
            Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.
          </p>
          {/* <Link href="/" className="btn btn-primary">
            Kembali ke Halaman Utama
          </Link> */}
        </div>
      </div>
      <div className="absolute bottom-4 w-full text-center">
        <p className="text-xs opacity-50">Copyright © {new Date().getFullYear()} - feldymulkan</p>
      </div>
    </div>
  );
}