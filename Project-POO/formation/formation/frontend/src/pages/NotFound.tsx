import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <p className="text-2xl font-semibold text-foreground">Page non trouvée</p>
          <p className="text-muted-foreground mt-2">Désolé, la page que vous recherchez n'existe pas.</p>
        </div>
        <Link to="/">
          <Button>Retour au tableau de bord</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

