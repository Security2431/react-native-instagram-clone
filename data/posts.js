import { USERS } from "./users";

export const POSTS = [
  {
    id: 1,
    imageUrl:
      "https://sc.pixwox.com/p/p_6838285815264549695114_0_68327565397c408f719a7f4fa8ac3198.jpg?u=https%3A%2F%2Fscontent-frt3-2.cdninstagram.com%2Fv%2Ft51.2885-15%2F306005782_1270568213701627_9200168567196604766_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080%26_nc_ht%3Dscontent-frt3-2.cdninstagram.com%26_nc_cat%3D107%26_nc_ohc%3D2Csh02BGeDYAX9oCXFW%26edm%3DAP_V10EBAAAA%26ccb%3D7-5%26oh%3D00_AT_6Ky1jFh1BzxeJoasNU8WLHFjs0iitopyZY6bi3bXP3Q%26oe%3D632BD3EA%26_nc_sid%3D4f375e&h=763c2aae5f255eee054c2fcfadb05f40",
    user: USERS[0].user,
    likes: 7870,
    caption:
      "Logon this is the logo of PRDP, matlab Prem Ratan Dhan Payo. Coming this Diwali Logon this is the logo of PRDP, matlab Prem Ratan Dhan Payo. Coming this Diwali 🚀🚀🚀",
    profile_picture: USERS[0].image,
    comments: [
      {
        id: 1,
        user: "theqazman",
        comment: "so jusy",
      },
    ],
  },
  {
    id: 2,
    imageUrl:
      "https://sc.pixwox.com/p/p_6830373624714814501540_0_5bd94e48d6c309a175a685254300b48b.jpg?u=https%3A%2F%2Fscontent-frt3-2.cdninstagram.com%2Fv%2Ft51.2885-15%2F288727117_184390493968613_3088541053214840913_n.jpg%3Fstp%3Ddst-jpg_e35_p1080x1080%26_nc_ht%3Dscontent-frt3-2.cdninstagram.com%26_nc_cat%3D105%26_nc_ohc%3DugxK1QzYFtIAX-EeltC%26edm%3DAP_V10EBAAAA%26ccb%3D7-5%26oh%3D00_AT9PMJDJY7aZ5mtaSXNCTApmnKJ11sa9gVdWdidoPwpipQ%26oe%3D632C72A0%26_nc_sid%3D4f375e&h=87103fb88cc6b38a9af911aaf4761d67",
    user: USERS[1].user,
    likes: 333,
    caption:
      "Logon this is the logo of PRDP, matlab Prem Ratan Dhan Payo. Coming this Diwali 😋",
    profile_picture: USERS[1].image,
    comments: [
      {
        id: 1,
        user: "theqazman",
        comment: "so jusy",
      },
      {
        id: 2,
        user: "amaanathdev",
        comment: "Let's get ridiculous",
      },
    ],
  },
];
