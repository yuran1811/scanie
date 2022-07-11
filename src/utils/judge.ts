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
      .replace(/[\n\s]/g, '')
      .trim()
      .split('+')
  );
  // console.log('accuracy: ', result);
  // console.log('questions: ', questions);

  const scores: { [key: string]: string } = {};

  questions.map((question) => {
    question.pop();

    question.forEach((item) => {
      const choices = item.split(':');
      choices.pop();

      const order = choices.shift();
      if (!order) return;

      scores[order] = 'blank';

      choices.forEach((chosen, idx) => {
        if (/([^ABCD])/.test(chosen)) {
          scores[order] = ['A', 'B', 'C', 'D'][idx];
        }
      });
    });
  });

  console.log(scores);

  return questions.join('\n');
};
