export default function(theme, mixins) {
  return {
    button: {
      borderRadius: '50px',
      textShadow: 'none',
      outline: 'none',
      width: '100%',
      cursor: 'pointer',
      border: '1px solid black',
      padding: '15px 10px',
      textAlign: 'center',
      marginBottom: '5px',
      backgroundColor: theme.primaryColor,
      transition: 'all 0.4s ease',
      ':active': true,
      ':hover': {
        backgroundColor: theme.secondaryColor
      }
    },
    label: {
      color: 'white',
      ':hover': {
        color: 'black'
      },
      ':active': {
        position: 'relative',
        top: 1
      }
    }
  };
}
