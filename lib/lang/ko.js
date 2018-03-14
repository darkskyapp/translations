"use strict";

function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

module.exports = {
  "clear": "맑음",
  "no-precipitation": "강수 없음",
  "mixed-precipitation": "진눈깨비",
  "possible-very-light-precipitation": "아주 약한 강수 가능성",
  "very-light-precipitation": "아주 약한 강수",
  "possible-light-precipitation": "약한 강수 가능성",
  "light-precipitation": "약한 강수",
  "medium-precipitation": "강수",
  "heavy-precipitation": "강한 강수",
  "possible-very-light-rain": "이슬비 가능성",
  "very-light-rain": "이슬비",
  "possible-light-rain": "가랑비 가능성",
  "light-rain": "약한 비",
  "medium-rain": "비",
  "heavy-rain": "강한 비",
  "possible-very-light-sleet": "아주 약한 진눈깨비 가능성",
  "very-light-sleet": "아주 약한 진눈깨비",
  "possible-light-sleet": "약한 진눈깨비 가능성",
  "light-sleet": "약한 진눈깨비",
  "medium-sleet": "진눈깨비",
  "heavy-sleet": "강한 진눈깨비",
  "possible-very-light-snow": "흩뿌리는 눈 가능성",
  "very-light-snow": "아주 약한 눈",
  "possible-light-snow": "약한 눈 가능성",
  "light-snow": "약한 눈",
  "medium-snow": "눈",
  "heavy-snow": "강한 눈",
  "possible-thunderstorm": "뇌우 가능성",
  "thunderstorm": "뇌우",
  "light-wind": "약한 바람",
  "medium-wind": "바람",
  "heavy-wind": "강한 바람",
  "low-humidity": "건조",
  "high-humidity": "습함",
  "fog": "안개",
  "light-clouds": "약간 흐림",
  "medium-clouds": "흐림",
  "heavy-clouds": "흐림",
  "today-morning": "오늘 아침",
  "later-today-morning": "오늘 오전",
  "today-afternoon": "오늘 오후",
  "later-today-afternoon": "오늘 오후",
  "today-evening": "오늘 저녁",
  "later-today-evening": "오늘 저녁",
  "today-night": "오늘 밤",
  "later-today-night": "오늘 밤",
  "tomorrow-morning": "내일 아침",
  "tomorrow-afternoon": "내일 오후",
  "tomorrow-evening": "내일 저녁",
  "tomorrow-night": "내일 밤",
  "morning": "아침",
  "afternoon": "오후",
  "evening": "저녁",
  "night": "밤",
  "today": "오늘",
  "tomorrow": "내일",
  "sunday": "일요일",
  "monday": "월요일",
  "tuesday": "화요일",
  "wednesday": "수요일",
  "thursday": "목요일",
  "friday": "금요일",
  "saturday": "토요일",
  "next-sunday": "다음주 일요일",
  "next-monday": "다음주 월요일",
  "next-tuesday": "다음주 화요일",
  "next-wednesday": "다음주 수요일",
  "next-thursday": "다음주 목요일",
  "next-friday": "다음주 금요일",
  "next-saturday": "다음주 토요일",
  "minutes": "$1분",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1인치",
  "centimeters": "$1cm",
  "less-than": "< $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", " : ", "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, "부터 ");
  },
  "with": "$1, $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1($2)",
  "for-hour": "한 시간 $1",
  "starting-in": "$2 후 $1 시작",
  "stopping-in": "$2 후 $1 멈춤",
  "starting-then-stopping-later": "$2 후 $1 시작, $3 후 멈춤",
  "stopping-then-starting-later": "$2 후 $1 멈춤, $3 후 다시 시작",
  "for-day": "온종일 $1",
  "starting": "$2에 $1 시작",
  "until": "$2까지 $1",
  "until-starting-again": "$2까지 $1, $3 다시 시작",
  "starting-continuing-until": "$2 $1 시작, $3까지 이어짐",
  "during": "$2동안 $1",
  "for-week": "일주일 내내 $1",
  "over-weekend": "주말 내내 $1",
  "temperatures-peaking": "$2 최고기온 $1",
  "temperatures-rising": "$2 $1까지 상승",
  "temperatures-valleying": "$2 최저기온 $1",
  "temperatures-falling": "$2 $1까지 하강",
  /* Korean doesn't have capitalization */
  "title": function(str) {
    return str;
  },
  /* The period looks weird in Korean */
  "sentence": function(str) {
    return str;
  },
};
