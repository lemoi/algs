const chalk = require('chalk');

function frame(title) {
    const time = process.hrtime();
    let passing = 0;
    let total = 0;
    let message = null;

    function should(description) {
        message = description;
        total += 1;
    }

    function check(task) {
        if (message === null) {
            throw new Error('There\'s no title. ');
        }
        let status;
        try {
            task();
            status = true;
            passing += 1;
        } catch (e) {
            status = false;
        }
        if (status) {
            console.log('* ' + '✓ '+ chalk.green(message));
        } else {
            console.log('* ' + '× ' + chalk.red(message));
        }
        message = null;
    }

    function formathrt(tuple) {
        return tuple[0] * 1e3 + ~~(tuple[1] / 1e6) + 'ms'; 
    }

    function end() {
        const cost = process.hrtime(time);
        console.log(': total: ' + total + ', passing: ' + passing + ', cost: ' + formathrt(cost));
    }

    console.log();
    console.log('# ' + title);
    return {
        should,
        check,
        end
    };
}

module.exports = frame;
