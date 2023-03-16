// JS Imports
import { useCookies } from 'react-cookie';
import ConfigPage from './ConfigPage';
import QuestionPage from './QuestionPage';
import EndPage from './EndPage';

// CSS Imports
import './index.css';

const questions = [
  {
    id: 'question_1',
    prompt: 'How did you hear about us?',
    responses: [
      'Facebook',
      'Google',
      'TikTok',
      'Instagram'
    ],
    type: 'radio',
    valid: ({type}) => type === 'New'
  },
  {
    id: 'question_2',
    prompt: 'Do you own any of the following?',
    responses: [
      'Dumbbells',
      'Medicine Ball',
      'Jump Rope',
      'Stationary Bike'
    ],
    type: 'checkbox',
    valid: ({type, location}) => type === 'Returning' && location === 'Idaho'
  },
  {
    id: 'question_3',
    prompt: 'What made you decide to buy the Black Jeans today?',
    type: 'text',
    valid: ({black_jeans_purchased}) => black_jeans_purchased
  },
];

function QuestionStream() {
  const [cookies, setCookie, deleteCookie] = useCookies(['page', 'config', ...questions.map(({ id }) => id)])
  const getCookie = (name) => cookies[name] === 'undefined' ? undefined : cookies[name];
  const config = getCookie('config');
  const page = JSON.parse(getCookie('page') || '0');

  const pages = [
    (
      <ConfigPage
        config={getCookie('config')}
        onChange={(value) => setCookie('config', value)}
        onSubmit={() => setCookie('page', page + 1)}
      />
    ),
  ]
  for (let question of questions) {
    if (config && question.valid(config)) pages.push(
      <QuestionPage
        question={question}
        config={getCookie(question.id)}
        onChange={(value) => setCookie(question.id, value)}
        onSubmit={() => setCookie('page', page + 1)}
      />
    );
  }
  pages.push(
    <EndPage
      questions={questions}
      onSubmit={() => Object.keys(cookies).forEach((key) => deleteCookie(key))}
    />
  )

  return (
    <div className="QuestionStream card">
      {pages[page]}
    </div>
  );
}

export default QuestionStream;
