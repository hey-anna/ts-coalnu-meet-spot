import theme from "@/styles/mui/theme";
import type { RECOMMEND_SUBWAY_STATIONS } from "../../domain/recommendation/models/model";

export const SUBWAY_STATIONS: RECOMMEND_SUBWAY_STATIONS = 
[
    {
    name: "홍대입구",
    description: "젊은 에너지와 다양한 문화가 어우러진 핫플레이스",
    tags: ["#클럽", "#젊음", "#감성"]
    },
    {
    name: "강남",
    description: "고급스러운 맛집과 쇼핑몰이 즐비한 트렌디한 중심가",
    tags: ["#고급", "#쇼핑", "#트렌디"]
    },
    {
    name: "신촌",
    description: "대학가 특유의 활기와 합리적인 가격의 맛집들",
    tags: ["#대학가", "#합리적", "#활기"]
    },
    {
    name: "명동",
    description: "관광명소와 브랜드 매장이 모인 서울의 대표 거리",
    tags: ["#관광", "#브랜드", "#중심가"]
    },
    {
    name: "이태원",
    description: "세계 각국의 음식과 이국적인 분위기를 만끽할 수 있는 곳",
    tags: ["#세계음식", "#이국적", "#다문화"]
    },
    {
    name: "건대입구",
    description: "대학생들의 성지, 저렴하고 맛있는 음식의 천국",
    tags: ["#학생가", "#저렴", "#맛집"]
    },
    {
    name: "신림",
    description: "고시촌 문화와 든든한 한 끼 식사를 책임지는 동네",
    tags: ["#한식", "#든든함", "#전통"]
    },
    {
    name: "종로3가",
    description: "전통과 현대가 조화를 이루는 서울의 역사적 중심지",
    tags: ["#전통", "#역사", "#한옥"]
    },
    {
    name: "동대문역사문화공원",
    description: "24시간 쇼핑과 야식문화의 메카, 밤에도 활기찬 곳",
    tags: ["#24시간", "#야식", "#쇼핑"]
    },
    {
    name: "성신여대입구",
    description: "아기자기한 카페와 감성적인 분위기의 젊은 거리",
    tags: ["#감성", "#카페", "#아기자기"]
    }
];

export type PlaceData = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

// 색상 팔레트
export const colorPalette = [
  theme.palette.primary.main,
  theme.palette.user.main,
  theme.palette.custom.secondary,
  theme.palette.error.main,
  theme.palette.warning.main,
  theme.palette.info.main,
  '#00b894',
  '#fd79a8',
  '#fdcb6e',
  '#d63384',
  '#a29bfe',
  '#74b9ff',
];