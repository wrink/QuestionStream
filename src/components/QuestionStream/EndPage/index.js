// JS Imports
import { useCookies } from 'react-cookie';

// CSS Imports
import './index.css';

// SVG Imports
import image from '../../../assets/svg/EndPage_img.svg';

function EndPage({ questions, onSubmit }) {
  const [cookies, setCookie] = useCookies(['config'])
  const getCookie = (name) => cookies[name] === 'undefined' ? undefined : cookies[name];
  const config = getCookie('config');

  const genAnswer = (id, type) => {
    const data = getCookie(id);
    return (type === 'checkbox') ? Object.keys(data).filter((key) => data[key]).join(', ') : data[id];
  }

  return (
    <div className='container'>
      <div className='EndPage-image'>
        <img src={image} alt='Image of a screen with a check mark in the middle.' />
      </div>
      <div className='EndPage-title'>
        <h5>Thanks for answering our questions!</h5>
      </div>

      <div className='EndPage-answers'>
        {questions.map((question, i) => (question.valid(config)) && (
          <div className='EndPage-answer' key={i}>
            <h6>{question.prompt}</h6>
            <p>{genAnswer(question.id, question.type)}</p>
          </div>
        ))}
      </div>

      <div className='EndPage-button-wrapper'>
        <button type='submit' className='EndPage-button btn btn-dark' onClick={onSubmit}>Restart</button>
      </div>
    </div>
  );
}

export default EndPage;