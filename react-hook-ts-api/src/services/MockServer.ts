const loadMirage = () => import("miragejs");

export function loadMirageInDev(baseURL: string) {
  if (process.env.NODE_ENV === "development") {
    loadMirage().then(({ Server }) => {
      return new Server({
          logging: true,
        routes() {
            console.log("Mirage> Server created for: ", baseURL);
          this.namespace = baseURL;

          this.get("tasks", () => {
              console.log("Mirage> Calling GET: ");
            return [
                {id: 1, description: 'Task1', done: false},
                {id: 2, description: 'Task2', done: true},
                {id: 3, description: 'Task3', done: false},
            ]
          });

          this.get("/tasks/1", () => {
            return {id: 1, description: 'Task1', done: false};
          });
        },
      });
    });
  }
}