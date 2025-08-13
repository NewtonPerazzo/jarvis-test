import Box from "../components//Box"
import Divider from "../components//Divider"
import Link from "../components//Link"
import { RoutesEnum } from "../types/RoutesEnum";
import { Label } from "../components/Label";
import { colors } from "../styles/colors";

interface HeaderDataProps {
  title: string;
  link: string;
  active: boolean;
}

export const Header = () => {
  const currentPath = window.location.pathname;

  const headersData: HeaderDataProps[] = [
    {
      title: 'Início',
      link: RoutesEnum.HOME,
      active: currentPath === RoutesEnum.HOME
    },
    {
      title: 'Salas',
      link: '/rooms',
      active: currentPath === RoutesEnum.ROOMS
    },
    {
      title: 'Histórico',
      link: RoutesEnum.HISTORY,
      active: currentPath === RoutesEnum.HISTORY
    },
  ]

  return (
    <>
      <Box flex justifyContent="space-between" width="100%" alignItems="center">
        <Box flex>
          <img src="./jarvis.png" height={50} width={50} />
          <Label weight={500} color={colors.blueTitle} size="32px">J.A.R.V.I.S</Label>
        </Box>

        <Box width="50%" flex justifyContent="space-around">
          {headersData.map((item, index) => (
            <Link key={index} href={item.link}>
              <Label color={item.active ? colors.fluorescentGreen : colors.bgGreenHover}>{item.title}</Label>
            </Link>
          ))}
        </Box>
      </Box>
      <Divider />
    </>
  )
}