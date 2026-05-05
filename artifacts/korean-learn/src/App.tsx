// ============================================================
// App — Enrutador principal de la aplicación
// ============================================================
import { Switch, Route, Router as WouterRouter } from "wouter";
import { Home } from "@/pages/Home";
import { Guide } from "@/pages/Guide";
import { ModuleView } from "@/pages/ModuleView";
import { LessonView } from "@/pages/LessonView";
import { Review } from "@/pages/Review";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-4xl mb-4">🤔</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Página no encontrada</h1>
        <a href="/" className="text-purple-600 underline">Volver al inicio</a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/guide" component={Guide} />
      <Route path="/module/:id" component={ModuleView} />
      <Route path="/module/:moduleId/lesson/:lessonId" component={LessonView} />
      <Route path="/review" component={Review} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
