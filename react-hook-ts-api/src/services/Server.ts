import { createServer, Server, Model, Registry } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { ModelDefinition, Instantiate, AnyFactories } from 'miragejs/-types';
type Task = {
    id: string
    description: string
    done: boolean
}
const TaskModel: ModelDefinition<Task> = Model.extend({});
export type AppRegistry = Registry<{ task: typeof TaskModel }, { /* factories can be defined here */ }>
type AppSchema = Schema<AppRegistry>
// https://dev.to/anikcreative/mocking-back-ends-for-react-apps-with-miragejs-jgb
export function makeServer({ environment = 'test', urlPrefix = 'http://localhost:3000'} = {}): Server<AppRegistry> {
    const server: Server<AppRegistry> = createServer({
        environment,
        models: {
          task: TaskModel  ,
        },

        seeds(server) {
          server.create('task', {
            id: '1',
            description: 'Praesent congue erat at massa.',
            done: false
          });
          server.create('task', {
            id: '2',
            description: 'Bla bla bla bla.',
            done: true
          });
        },

        routes() {
            console.log("Defining routes for: ", environment)
            this.urlPrefix = urlPrefix;
            this.namespace = 'api';
            this.get("/tasks", (schema, request) => {        
                return schema.all("task");      
           });
            this.get('/tasks', (schema, request) => {
                return schema.all('task');
            });

            this.get('tasks/:id', (schema, request) => {
              const id = request.params.id;
              return schema.find('task',id);
            });

            this.post("/tasks/search", (schema, request) => {             
              const attrs = JSON.parse(request.requestBody);  
              console.log("Search: ", attrs, attrs.description)
              const allTasks = schema.all('task');
              const tasks = schema.all('task').filter((task: any) => task.description.includes(attrs.description));

              console.log("Found this: ", tasks, tasks.length)
              return tasks;     
            });

            this.post("/tasks", (schema, request) => {             
              const attrs = JSON.parse(request.requestBody);
              schema.create("task", attrs);        
              return schema.all("task");      
            });  

            this.del("/tasks/:id", (schema, request) => {        
              const id = request.params.id;        
              //const task = schema.findBy("task", {id: id})
              const task : Instantiate<Registry<{ task: ModelDefinition<Task>; }, AnyFactories>, "task"> | null= schema.find('task',id);       
              if(task !== null) task.destroy();       
              return task;      
            });

            this.del("/tasks", (schema, request) => {        
              const tasks = schema.all('task');
              return tasks.destroy();  
            });
          
            this.put("/tasks/:id", (schema, request) => {
              const newAttrs = JSON.parse(request.requestBody);
              const id = request.params.id;
              const task: any | null = schema.find('task',id);
              console.log("Updating new attrs: ", newAttrs)
              return task.update(newAttrs);
            });
        }
    });
  return server;
}