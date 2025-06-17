export function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
       <p className="text-gray-600">Carregando produtos...</p>
    </div>
  );
}