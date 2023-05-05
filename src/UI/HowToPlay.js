import Card from "./Card";
import classes from "./Card.module.css";
import CloseIcon from "@mui/icons-material/Close";
const HowToPlay = ({ setShowHowToPlay, showHowToPlay }) => {
  const howToPlayHandler = (event) => {
    event.stopPropagation();
    setShowHowToPlay(false);
  };

  return (
    <div
      className={`${classes.backdrop} ${showHowToPlay ? classes.show : ""}`}
      onClick={() => setShowHowToPlay(false)}
    >
      <Card onClick={(event) => event.stopPropagation()}>
        <div className={classes.howToPlayModule}>
          <div className={classes.closeModuleBox}>
            <div className={classes.closeModule} onClick={howToPlayHandler}>
              <CloseIcon />
            </div>
          </div>
          <div className={classes.gameRules}>
            <div>
              <h2>אז איך משחקים?</h2>
            </div>
            <div className={classes.rulesList}>
              <ul>
                <li>בכל שורה הזינו מילה בת חמש אותיות בדיוק</li>
                <li>
                  אחרי כל ניסיון, האותיות ייצבעו בצבעים שמשקפים עד כמה הניחוש
                  קרוב למילה שנבחרה
                </li>
                <li>נחשו את המילה תוך שישה ניסיונות או פחות</li>
              </ul>
            </div>
            <div>
              <h3>דוגמאות:</h3>
            </div>
            <div className={classes.exampleBlocksBox}>
              <div className={classes.exampleBlock}>א</div>
              <div className={classes.exampleBlock}>ת</div>
              <div className={`${classes.exampleBlock} ${classes.correct}`}>
                מ
              </div>
              <div className={classes.exampleBlock}>ו</div>
              <div className={classes.exampleBlock}>ל</div>
            </div>
            <p>* האות מ' קיימת במילה, בדיוק במקום הנכון *</p>
            <div className={classes.exampleBlocksBox}>
              <div className={classes.exampleBlock}>ה</div>
              <div className={classes.exampleBlock}>צ</div>
              <div className={classes.exampleBlock}>ל</div>
              <div className={`${classes.exampleBlock} ${classes.almost}`}>
                ח
              </div>
              <div className={classes.exampleBlock}>ה</div>
            </div>
            <p>
              * האות ח' נמצאת במילה אבל לא במקום הנכון. <br />
              <b>שימו לב:</b> אותיות יכולות להופיע יותר מפעם אחת במילה*
            </p>
            <div className={classes.exampleBlocksBox}>
              <div className={classes.exampleBlock}>מ</div>
              <div className={`${classes.exampleBlock} ${classes.wrong}`}>
                ד
              </div>
              <div className={classes.exampleBlock}>ל</div>
              <div className={classes.exampleBlock}>י</div>
              <div className={classes.exampleBlock}>ק</div>
            </div>
            <p>* האות ד' לא נמצאת במילה *</p>
            <div className={classes.gameModes}>
              <h3>מצבי משחק:</h3>
              <ul>
                <li>
                  ניתן לבחור בין מצבי המשחק על ידי לחיצה על "מצב משחק" מצד ימין
                  למעלה
                </li>
                <li>ניתן לעבור באופן חופשי בין משחק יומי למשחק אינסופי.</li>
                <li>כל לחיצה על "משחק אינסופי" תחדש את המילה הנדרשת לגילוי.</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HowToPlay;
