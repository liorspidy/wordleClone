import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Snackbar.css';

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function PositionedSnackbar() {
  const { wrongWord, setWrongWord } = useContext(AppContext);
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    Transition: Fade,
  });
  const { vertical, horizontal, open } = state;

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleClick = debounce((Transition) => {
    setState({
      open: true,
      Transition,
      ...{
        vertical: 'top',
        horizontal: 'center',
      },
    });
  }, 0);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    if (wrongWord) {
      handleClick(SlideTransition);
      setWrongWord(false);
    }
  }, [wrongWord]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="המילה הזו אינה מופיעה במילון"
        key={vertical + horizontal}
        TransitionComponent={state.Transition}
      />
    </div>
  );
}
