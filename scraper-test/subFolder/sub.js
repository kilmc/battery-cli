const cool = true;
const paraStyles = styles('type-12',cool ? 'grey-400' : 'grey-200',['things'])

const CoolComponent = () => (
  <div>
    <p className={paraStyles}>Cool Text</p>
  </div>
);