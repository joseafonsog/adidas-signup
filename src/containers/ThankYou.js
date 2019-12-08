import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

export default function(props) {
    const { t, i18n } = useTranslation();

    return <Typography component="h1" variant="h5">
    {t('thanks')}
  </Typography>
}