'use strict';

/**
 * Re-exports React 18 plus useEffectEvent from use-effect-event.
 * Used so Sanity Studio (which expects React 19's useEffectEvent) works with React 18.
 * Used via webpack alias for 'react'.
 */
const React = require('react-original');
const { useEffectEvent } = require('use-effect-event');

module.exports = {
  ...React,
  useEffectEvent,
};
