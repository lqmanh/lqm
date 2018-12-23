const { PHASE_PRODUCTION_SERVER } =
  !(process.env.NODE_ENV === 'production')
    ? {} // We're never in "production server" phase when in development mode
    : process.env.NOW_REGION
      ? require('next-server/constants') // Get values from `next-server` package when building on now v2
      : require('next/constants') // Get values from `next` package when building locally


module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {}
  }
  const withSass = require('@zeit/next-sass')
  return withSass()
}
