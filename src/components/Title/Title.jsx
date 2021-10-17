import React from 'react';
import PropTypes from 'prop-types';
import s from './title.module.scss';

const Title = ({ title }) => <h2 className={s.title}>{title}</h2>;
export default Title;

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
