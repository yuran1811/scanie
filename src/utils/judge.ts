import Tesseract from 'tesseract.js';

export const recognize = async (img: string, callback: CallableFunction) => {
  try {
    const { data } = await Tesseract.recognize(img, 'eng', {
      logger: (m) => {
        callback(m);
      },
    });

    return data;
  } catch (error) {
    throw new Error(error + '');
  }
};

export const standardize = (result: Tesseract.Page) => {
  const questions = result.lines.map((_) =>
    _.text
      .trim()
      .replace(/[\n\t]/g, '')
      .split('+')
  );
  // console.log('accuracy: ', result);

  const scores: { [key: string]: string } = {};

  questions.map((question) => {
    question.forEach((item) => {
      const pattern = item.replace(/[^A-Za-z\d]/gi, '');
      const order = pattern.match(/\d+/gi);
      if (!order) return;

      scores[order[0]] = 'blank';

      const notChosenAns = pattern.match(/[A-Za-z]+/gi);
      const chosenAns = 'ABCD'.match(new RegExp(`[^${notChosenAns}]`, 'gim'));

      chosenAns && (scores[order[0]] = chosenAns[0]);
    });
  });

  console.log(questions, scores);

  return questions.join('\n');
};
