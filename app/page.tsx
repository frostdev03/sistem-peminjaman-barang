export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Sistem Peminjaman Alat (Lokal)</h1>
      <p className="mt-2">
        Klik{" "}
        <a href="/peminjaman" className="text-blue-600">
          Peminjaman
        </a>{" "}
        untuk mulai.
      </p>
    </div>
  );
}
