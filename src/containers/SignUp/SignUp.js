import React, { useEffect, useReducer } from 'react';
import qs from 'qs';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Material UI components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HelpIcon from '@material-ui/icons/Help'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Tooltip from '@material-ui/core/Tooltip';

// Local components
import Copyright from '../../components/Copyright';

// helpers
import isEmail from '../../helpers/isEmail';

// styles
import useStyles from './styles';

const initialState = {
  email: {
    value: '',
    required: true,
    touch: false
  },
  age: {
    value: false,
    required: true,
    touch: false
  },
  gender: {
    value: 'female',
    required: false,
    touch: false
  },
  newsletter: {
    value: false,
    required: false,
    touch: false
  },
}

function formReducer(state, {field, value, type}) {
  const val = type && type === 'checkbox' ? !state[field].value : value;
  return {
    ...state,
    [field]: {
      ...state[field],
      value: val,
      touch: true
    }
  }
}

export default function SignUp() {
  const classes = useStyles();
  
  // hooks
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { t, i18n } = useTranslation();
  let location = useLocation();
  let history = useHistory();

  // query string parse
  var query = qs.parse(location.search.substr(1));

  // functions 
  const handleChange = event => {
    dispatch({field: event.target.name, value: event.target.value, type: event.target.type})
  };

  const showControl = control => {
    switch (control) {
      case "newsletter":
        return i18n.language === 'de';
      case "gender":
        return i18n.language === 'en';
      default:
        return true;
    }
  }

  const isValid = field => {
    if (!field) {
      return ((state.email.required && isValid('email')) || !state.email.required) &&
      ((state.age.required && isValid('age')) || !state.age.required) &&
      ((state.gender.required && isValid('gender')) || !state.gender.required) &&
      ((state.newsletter.required && isValid('newsletter')) || !state.newsletter.required);
    } else {
      switch (field) {
        case 'email':
          return isEmail(state[field].value);
        case 'age':
          return state[field].value
        default:
          return true;
      }
    }
  }
  

  // Change language from query string
  useEffect(() => {
    i18n.changeLanguage(query.l);
  });

  const { email, age, gender, newsletter } = state;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('title')}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          {showControl('email') && <Grid item xs={12}>
              <TextField
                error={email.touch && !isValid('email')}
                name="email"
                variant="outlined"
                required={email.required}
                fullWidth
                id="email"
                label={t('email.label')}
                autoComplete="email"
                autoFocus
                value={email.value}
                onChange={handleChange}
                helperText={ email.touch && !isValid('email') ? t('email.error') : null }
              />
            </Grid>}
            {showControl('age') && <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="age" value={age.value} required={age.required} onChange={handleChange} color="primary" />}
                label={t('age.label')}
              />
              <Tooltip title={t('age.message')} placement="right">
                <HelpIcon className={classes.help} />
              </Tooltip>
            </Grid>}
            {showControl('gender') && <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{t('gender.label')}</FormLabel>
                <RadioGroup 
                  aria-label="gender" 
                  name="gender" 
                  value={gender.value} 
                  required={gender.required} 
                  onChange={handleChange}>
                  <FormControlLabel value="female" control={<Radio />} label={t('gender.female')} />
                  <FormControlLabel value="male" control={<Radio />} label={t('gender.male')} />
                  <FormControlLabel value="other" control={<Radio />} label={t('gender.other')} />
                </RadioGroup>
              </ FormControl>
          </Grid>}
          {showControl('newsletter') && <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value={newsletter.value}  onChange={handleChange} required={newsletter.required} color="primary" />}
                label={t('newsletter.label')}
              />
            </Grid>}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid()}
            onClick={() => history.push('/thanks')}
          >
            {t('button.label')}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                {t('signin.link')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}