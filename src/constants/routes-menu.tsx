import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { colors } from "./colors";
import { ItemMenu } from "@/interfaces/constants";

const sizeIcon = 24;
export const colorIcon = colors.gray[500];
const baseRouterSettings = "settings";

export const routesExcludeTab = [
  `/${baseRouterSettings}/profile`,
  `/${baseRouterSettings}/conversations`,
  `/${baseRouterSettings}/create-profile-work`,
  `/${baseRouterSettings}/settings-app`,
  `/${baseRouterSettings}/help`,
];

export const routerMenu: ItemMenu[] = [
  {
    id: 1,
    href: `${baseRouterSettings}/profile`,
    title: "Meu Perfil",
    iconStart: (
      <FontAwesome5 name="user-alt" size={sizeIcon} color={colorIcon} />
    ),
    subtitle: "Meu perfil, para edição de informações pessoais",
    isMenuOption: true,
  },
  // {
  //   id: 2,
  //   href: `${baseRouterSettings}/requested-service`,
  //   title: "Serviços Solicitados",
  //   iconStart: (
  //     <MaterialIcons name="construction" size={sizeIcon} color={colorIcon} />
  //   ),
  //   subtitle: "Serviços ou mãos de obra contratados",
  //   isMenuOption: true,
  // },
  {
    id: 2,
    href: `${baseRouterSettings}/conversations`,
    title: "Conversas",
    iconStart: (
      <MaterialIcons name="chat-bubble" size={sizeIcon} color={colorIcon} />
    ),
    subtitle: "Conversas com os prestadores contratados",
    isMenuOption: true,
  },
  {
    id: 3,
    href: `${baseRouterSettings}/create-profile-work`,
    title: "Quero Trabalhar",
    iconStart: (
      <FontAwesome5 name="user-tie" size={sizeIcon} color={colorIcon} />
    ),
    subtitle: "Criar um perfil de trabalho para prestação de mão de obra",
    isMenuOption: true,
  },
  {
    id: 4,
    href: `${baseRouterSettings}/settings-app`,
    title: "Configurações",
    iconStart: (
      <MaterialIcons name="settings" size={sizeIcon} color={colorIcon} />
    ),
    subtitle: "Configure seu app conforme suas necessidades",
    isMenuOption: true,
  },
  {
    id: 5,
    href: `${baseRouterSettings}/help`,
    iconStart: (
      <MaterialIcons name="help-center" size={sizeIcon} color={colorIcon} />
    ),
    title: "Preciso de ajuda",
    subtitle: "Solicitar suporte para equipe Jobs Radar",
    isMenuOption: true,
  },
];
