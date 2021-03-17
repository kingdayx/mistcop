const fs = require('fs')

async function scrapeProduct() {
  let nftsData = []
  console.log('\nGetting files from gallery folder...')
  let files = fs.readdirSync(`${__dirname}/gallery`)

  console.log('\nPreparing metadata directory...')
  await fs.rmdirSync(`${__dirname}/metadata`, { recursive: true }, function (
    err,
  ) {
    if (err) throw err
    console.log('File is created successfully.')
  })
  await fs.mkdirSync(`${__dirname}/metadata`, { recursive: true }, function (
    err,
  ) {
    if (err) throw err
    console.log('File is created successfully.')
  })

  console.log('\nCreating metadata...')
  for (let i = 0; i < files.length; i++) {
    var img = fs.readFileSync(`${__dirname}/gallery/${files[i]}`, {
      encoding: 'base64',
    })
    let metadata = JSON.stringify(
      {
        name: `${/[^.]*/.exec(files[i])[0]}`,
        description: 'metadata for mistcop',
        image: `${files[i]}`,
        data: img,
      },
      null,
      '\t',
    )

    await fs.writeFileSync(
      `${__dirname}/metadata/${/[^.]*/.exec(files[i])[0]}`,
      metadata,
    )
  }
}

scrapeProduct()
