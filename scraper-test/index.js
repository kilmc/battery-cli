const cool = true;
const paraStyles = styles('type-12',cool ? 'grey-400' : 'grey-200',['things'])

const CoolComponent = () => (
  <div className='bg-black white'>
    <p className={paraStyles}>Cool Text</p>
  </div>
);