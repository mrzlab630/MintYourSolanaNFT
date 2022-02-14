/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-29
 * Time: 16:07
 * About:
 *
 */

module.exports = {
    apps : [{
        name: "mintYourSolanaNFT",
        cwd:"/home/mrZLab630pw/mintYourSolanaNFT.com",
        script: "npm",
        args: 'start',
        exp_backoff_restart_delay: 100,
        watch: false,
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        },
        error_file: '/home/mrZLab630pw/mintYourSolanaNFT.com/logs/err_mintYourSolanaNFT.log',
        out_file: '/home/mrZLab630pw/mintYourSolanaNFT.com/logs/out_mintYourSolanaNFT.log',
        time: true,
    }]
}