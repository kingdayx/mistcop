const fs = require('fs')
const ipfs = IpfsHttpClient('http://127.0.0.1:5001')
const prompt = require('prompt-sync')()

async function scrapeProduct() {
  let files = fs.readdirSync(`${__dirname}/gallery`)
  console.log('\nUploading images on IPFS...')
  let upload = await ipfs.add(
    globSource(`${__dirname}/gallery`, { recursive: true }),
  )
  console.log('\nGetting files from gallery folder...')
  let files = fs.readdirSync(`${__dirname}/gallery`)

  console.log('\nPreparing metadata directory...\n')
  await fs.rmSync(`${__dirname}/metadata`, { recursive: true }, function (err) {
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
    const name = prompt('What is the name of the picture? ')
    const rarity = prompt('What is the name of the what is the rarity? ')
    var img = fs.readFileSync(`${__dirname}/gallery/${files[i]}`, {
      encoding: 'base64',
    })
    let metadata = JSON.stringify(
      {
        name: `${name}`,
        imageUrl: `https://ipfs.io/ipfs/${upload.cid.toString()}/${files[i]}`,
        attributes: [{ trait_type: 'Rarity', value: `${rarity}` }],
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
