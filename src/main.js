
class App {

  run = async (name = 'World') => {
    console.log(`Hello ${name}`);
  };

}

const app = new App();
app.run()
  .then(() => console.log('done'))
  .catch(err => console.log(err.name));