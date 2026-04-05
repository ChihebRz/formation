import { useConnectionCheck } from "@/hooks/useConnectionCheck";

export const ConnectionAlert = () => {
  const { isConnected, error } = useConnectionCheck();

  if (isConnected === null) {
    return null; // Pas encore vérifié
  }

  if (isConnected === true) {
    return null; // Connexion OK
  }

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-red-100 border-l-4 border-red-500 rounded max-w-md">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <span className="text-xl text-red-600">⚠️</span>
        </div>
        <div>
          <h3 className="font-bold text-red-800">Erreur de connexion</h3>
          <p className="text-sm text-red-700 mt-1">
            Impossible de se connecter au backend (http://localhost:8080)
          </p>
          {error && (
            <p className="text-xs text-red-600 mt-2 font-mono bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
          <p className="text-xs text-red-700 mt-2">
            ✓ Vérifiez que le backend est lancé sur le port 8080<br/>
            ✓ Vérifiez que vous êtes sur http://localhost:3000<br/>
            ✓ Rafraîchissez la page dans 30 secondes
          </p>
        </div>
      </div>
    </div>
  );
};

