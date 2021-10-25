
const cheerio = require('cheerio')
const request = require('request')
const CronJob = require('cron').CronJob
const { Post } = require('../models/newsModel')


var job = new CronJob('* 6 * * * *', () => {
    // TECHCHRUNCH
    console.log('Started Job')
    request('https://techcrunch.com', (err, res, html) => {
        if (!err && res.statusCode == 200) {
            let source = 'TechCrunch'
            const $ = cheerio.load(html)

            $('div.river').find('div.post-block').find('header.post-block__header').each((i, el) => {
                // let text = $(el).html()
                let author = $(el).find('span.river-byline__authors').find('a').text().trim().replace(/\t+/g, '').replace(/\n+/g, ' & ')
                let title = $(el).find('h2.post-block__title').text().trim()
                let time = $(el).find('time.river-byline__time').text().replace(/[\t+\n+]/g, '')
                let link = $(el).find('a.post-block__title__link').attr('href')

                request(link, (err, res, post) => {
                    if (!err && res.statusCode == 200){
                        const $$ = cheerio.load(post)

                        $$('article.article-container').each((j, el) => {
                            let imgUrl = $$(el).find('img').attr('src')
                            let post = $$(el).find('div.article-content').text().replace(/[\t+\n+]/g, '')
                            // Save to DB
                            Post.create({author, title, time, imgUrl, post, source })
                                .then( () => console.log('Saved to Database') )
                                .catch( (e) => console.log(e) )
                        })
                        // Add More Or Return


                    } else {
                        console.log('Error while loading Post request', err)
                    }
                })
            })
        } else {
            console.log('Error while loading request', err)
        }
    })
    // 



    console.log('Finished Job')
})


module.exports = { job }
