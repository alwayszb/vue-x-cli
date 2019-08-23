var program = require('./index');

program.on('--help', function() {
  console.log();
  console.log('  Examples:');
  console.log();
  console.log('    $ vxc --help');
  console.log('    $ vxc -h');

  // console.log();
  // console.log(
  //   chalk.gray('    # create a new my-component.vue file with an template in components directory'),
  // );

  // console.log();
  // console.log('    $ vxc my-component');
  // console.log(
  //   chalk.gray('    # create a new my-component.vue file with an template in libs directory'),
  // );

  // console.log();
  // console.log('    $ vxc libs my-component');
  // console.log(
  //   chalk.gray(
  //     '    # create more new my-component01.vue, my-component02.vue and my-component03.vue files with an template in libs directory',
  //   ),
  // );

  // console.log();
  // console.log('    $ vxc libs my-component01 my-component02 my-component03');
  // console.log(
  //   chalk.gray(
  //     '    # create more new my-component01.vue, my-component02.vue and my-component03.vue files with an template in ./components/libs directory',
  //   ),
  // );
  // console.log('    $ vxc ./components/libs my-component01 my-component02 my-component03');
  // console.log();
});
