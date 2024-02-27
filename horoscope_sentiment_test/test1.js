const Sentiment = require('sentiment');

//let zodiakSigns = [aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces];

async function runProcess() {

  let zodiakSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

  for (let i = 0; i < zodiakSigns.length; i++) {

    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${zodiakSigns[i]}&day=TODAY`);
    json = await response.json();
    console.log(json)

    // https://horoscope-app-api.vercel.app/

    // Your text
    const text = json.data.horoscope_data;
    console.log(text)

    // // Create a Sentiment instance
    const sentiment = new Sentiment();

    // // Get the sentiment result
    const result = sentiment.analyze(text);

    // // Print the result
    console.log(result);

    // // Access the sentiment score (positive, negative, or neutral)
    console.log(`Sentiment Score: ${result.score}`);

    console.log(result.positive);
    if (result.positive.length > result.negative.length) {
      console.log('Positive')
    } else if (result.negative.length > result.positive.length) {
      console.log('Negative')
    } else if (result.negative.length = result.positive.length) {
      console.log('Neutral')
    }
  }
}

runProcess();