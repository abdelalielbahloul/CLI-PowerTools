const program = require('commander');
program.version('0.0.1');


// commands 
program
  .command('say')
  .description('say somethings inters.')
  .alias('s')
  .action( name => {
    console.log(name.parent.args[0]);
    
  });

program
  .option('-d, --do', 'Do something')
  .action(task => {
    console.log(`Doing this ${task.args}`);
    
  })

program.parse(process.argv);