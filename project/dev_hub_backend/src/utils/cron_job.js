import cron from 'node-cron';

cron.schedule("* * * * * *", () => {
// cron.schedule("* * * * *", () => {
    console.log("Cron job::: Runnning. time::: " + new Date().toLocaleString());
});

/**
 * cron string:
  ┌────────────── second (optional)
  │ ┌──────────── minute
  │ │ ┌────────── hour
  │ │ │ ┌──────── day of month
  │ │ │ │ ┌────── month
  │ │ │ │ │ ┌──── day of week
  │ │ │ │ │ │
  │ │ │ │ │ │
  * * * * * *
 *
 * here * represents "every".
 * | * * * * * * -> every second
 * 
 * | * * * * * -> every minute
 * | 10 * * * * -> every hour at 10th minute
 * | 5 9 * * * -> every day at 9:05 AM
 * | 0 9 * * 1-5 -> every weekday at 9:00 AM
 * | 0 9 * * 1,3,5 -> every Monday, Wednesday, and Friday at 9:00 AM
 * | 0 9 * * 1-5 -> monday to friday at 9:00 AM
 * | 10 10 5 * * -> every month on the 5th at 10:10 AM
 * | 9 5 21 2 * -> every year on February 21st at 5:09 AM
 * 
 * explore more cron string at https://crontab.guru/ or other cron string generator.
 * 
 * cron job is a scheduled task that runs automatically at specified intervals or times. if we use cron job for sending emails using for loop it will block the main thread. when we will work with about million users and we want to send email it will be a problem.
 * 
 * we can use bee queue or bull queue for handling such tasks. these are job queues that allow us to offload time-consuming tasks to a separate worker process, ensuring that the main thread remains responsive and can handle other requests efficiently.
 */