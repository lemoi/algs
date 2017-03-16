const chalk = require('chalk');

function frame(title) {
    const time = process.hrtime();
    let passing = 0;
    let total = 0;

    function check(message, task) {
        if (!message || !task) {
            throw new Error('There\'s no message. ');
        }
        total += 1;
        let status;
        try {
            task();
            status = true;
            passing += 1;
        } catch (e) {
            throw e;
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
        check,
        end
    };
}

module.exports = frame;
