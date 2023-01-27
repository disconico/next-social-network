import Image from 'next/image';
import { useTheme } from 'next-themes';
import LogoDark from '../../public/assets/images/logoDark.png';
import LogoLight from '../../public/assets/images/logoLight.png';
import discoNetwork from '../../public/assets/images/discoNetwork.png';

const Logo = () => {
  //   const { theme } = useTheme();

  //   const currentTheme = theme;
  //   const imgSrc = currentTheme === 'dark' ? LogoDark : LogoLight;

  return (
    <Image
      src={discoNetwork}
      alt='DiscoNetwork Logo'
      width={400}
      height={200}
    />
  );
};

export default Logo;
