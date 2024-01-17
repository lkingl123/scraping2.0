const fs = require('fs');

const puppeteer = require('puppeteer')

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.traversymedia.com')

    // await page.screenshot({path: 'example.png', fullPage: true})
    // await page.pdf({path: 'example.pdf', format: 'A4', printBackground: true})

    // const html = await page.content();
    // console.log(html);

    // const title = await page.evaluate(() => document.title);
    // console.log(title);

    // const text = await page.evaluate(() => document.body.innerText);
    // console.log(text);

    // const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
    // console.log(links)

    // const courses = await page.evaluate(() =>
    //  Array.from(document.querySelectorAll('#cscourses .card'), (e) => ({
    //     title: e.querySelector('.card-body h3').innerText,
    //     difficulty: e.querySelector('.card-body .level').innerText,
    //     url: e.querySelector('.card-footer a').href,
    // }))
    // );


    const courses = await page.$$eval('#cscourses .card', (elements) =>
     elements.map((e) => ({
        title: e.querySelector('.card-body h3').innerText,
        difficulty: e.querySelector('.card-body .level').innerText,
        url: e.querySelector('.card-footer a').href,
    }))
    
    );


    console.log(courses)

    //save data to JSON file
    
    fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
        if(err) throw err;
        console.log('File saved succesfully!')
    });


    await browser.close();
}


run();