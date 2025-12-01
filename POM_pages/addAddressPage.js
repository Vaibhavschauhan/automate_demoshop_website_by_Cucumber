import { expect } from "playwright/test";
const countryMap = {
    "select country": "0",
    "united states": "1",
    "canada": "2",
    "afghanistan": "86",
    "albania": "87",
    "algeria": "88",
    "american samoa": "89",
    "andorra": "90",
    "angola": "91",
    "anguilla": "92",
    "antarctica": "93",
    "antigua and barbuda": "94",
    "argentina": "3",
    "armenia": "4",
    "aruba": "5",
    "australia": "6",
    "austria": "7",
    "azerbaijan": "8",
    "bahamas": "9",
    "bahrain": "95",
    "bangladesh": "10",
    "barbados": "96",
    "belarus": "11",
    "belgium": "12",
    "belize": "13",
    "benin": "97",
    "bermuda": "14",
    "bhutan": "98",
    "bolivia": "15",
    "bosnia and herzegowina": "16",
    "botswana": "99",
    "bouvet island": "100",
    "brazil": "17",
    "british indian ocean territory": "101",
    "brunei darussalam": "102",
    "bulgaria": "18",
    "burkina faso": "103",
    "burundi": "104",
    "cambodia": "105",
    "cameroon": "106",
    "cape verde": "107",
    "cayman islands": "19",
    "central african republic": "108",
    "chad": "109",
    "chile": "20",
    "china": "21",
    "christmas island": "110",
    "cocos (keeling) islands": "111",
    "colombia": "22",
    "comoros": "112",
    "congo": "113",
    "cook islands": "114",
    "costa rica": "23",
    "cote d'ivoire": "115",
    "croatia": "24",
    "cuba": "25",
    "cyprus": "26",
    "czech republic": "27",
    "denmark": "28",
    "djibouti": "116",
    "dominica": "117",
    "dominican republic": "29",
    "ecuador": "30",
    "egypt": "31",
    "el salvador": "118",
    "equatorial guinea": "119",
    "eritrea": "120",
    "estonia": "121",
    "ethiopia": "122",
    "falkland islands (malvinas)": "123",
    "faroe islands": "124",
    "fiji": "125",
    "finland": "32",
    "france": "33",
    "french guiana": "126",
    "french polynesia": "127",
    "french southern territories": "128",
    "gabon": "129",
    "gambia": "130",
    "georgia": "34",
    "germany": "35",
    "ghana": "131",
    "gibraltar": "36",
    "greece": "37",
    "greenland": "132",
    "grenada": "133",
    "guadeloupe": "134",
    "guam": "135",
    "guatemala": "38",
    "guinea": "136",
    "guinea-bissau": "137",
    "guyana": "138",
    "haiti": "139",
    "heard and mc donald islands": "140",
    "honduras": "141",
    "hong kong": "39",
    "hungary": "40",
    "iceland": "142",
    "india": "41",
    "indonesia": "42",
    "iran (islamic republic of)": "143",
    "iraq": "144",
    "ireland": "43",
    "israel": "44",
    "italy": "45",
    "jamaica": "46",
    "japan": "47",
    "jordan": "48",
    "kazakhstan": "49",
    "kenya": "145",
    "kiribati": "146",
    "korea": "147",
    "korea, democratic people's republic of": "50",
    "kuwait": "51",
    "kyrgyzstan": "148",
    "lao people's democratic republic": "149",
    "latvia": "150",
    "lebanon": "151",
    "lesotho": "152",
    "liberia": "153",
    "libyan arab jamahiriya": "154",
    "liechtenstein": "155",
    "lithuania": "156",
    "luxembourg": "157",
    "macau": "158",
    "macedonia": "159",
    "madagascar": "160",
    "malawi": "161",
    "malaysia": "52",
    "maldives": "162",
    "mali": "163",
    "malta": "164",
    "marshall islands": "165",
    "martinique": "166",
    "mauritania": "167",
    "mauritius": "168",
    "mayotte": "169",
    "mexico": "53",
    "micronesia": "170",
    "moldova": "171",
    "monaco": "172",
    "mongolia": "173",
    "montenegro": "174",
    "montserrat": "175",
    "morocco": "176",
    "mozambique": "177",
    "myanmar": "178",
    "namibia": "179",
    "nauru": "180",
    "nepal": "181",
    "netherlands": "54",
    "netherlands antilles": "182",
    "new caledonia": "183",
    "new zealand": "55",
    "nicaragua": "184",
    "niger": "185",
    "nigeria": "186",
    "niue": "187",
    "norfolk island": "188",
    "northern mariana islands": "189",
    "norway": "56",
    "oman": "190",
    "pakistan": "57",
    "palau": "191",
    "panama": "192",
    "papua new guinea": "193",
    "paraguay": "58",
    "peru": "59",
    "philippines": "60",
    "pitcairn": "194",
    "poland": "61",
    "portugal": "62",
    "puerto rico": "63",
    "qatar": "64",
    "reunion": "195",
    "romania": "65",
    "russia": "66",
    "rwanda": "196",
    "saint kitts and nevis": "197",
    "saint lucia": "198",
    "saint vincent and the grenadines": "199",
    "samoa": "200",
    "san marino": "201",
    "sao tome and principe": "202",
    "saudi arabia": "67",
    "senegal": "203",
    "serbia": "85",
    "seychelles": "204",
    "sierra leone": "205",
    "singapore": "68",
    "slovakia (slovak republic)": "69",
    "slovenia": "70",
    "solomon islands": "206",
    "somalia": "207",
    "south africa": "71",
    "south georgia & south sandwich islands": "208",
    "spain": "72",
    "sri lanka": "209",
    "st. helena": "210",
    "st. pierre and miquelon": "211",
    "sudan": "212",
    "suriname": "213",
    "svalbard and jan mayen islands": "214",
    "swaziland": "215",
    "sweden": "73",
    "switzerland": "74",
    "syrian arab republic": "216",
    "taiwan": "75",
    "tajikistan": "217",
    "tanzania": "218",
    "thailand": "76",
    "togo": "219",
    "tokelau": "220",
    "tonga": "221",
    "trinidad and tobago": "222",
    "tunisia": "223",
    "turkey": "77",
    "turkmenistan": "224",
    "turks and caicos islands": "225",
    "tuvalu": "226",
    "uganda": "227",
    "ukraine": "78",
    "united arab emirates": "79",
    "united kingdom": "80",
    "united states minor outlying islands": "81",
    "uruguay": "82",
    "uzbekistan": "83",
    "vanuatu": "228",
    "vatican city state (holy see)": "229",
    "venezuela": "84",
    "viet nam": "230",
    "virgin islands (british)": "231",
    "virgin islands (u.s.)": "232",
    "wallis and futuna islands": "233",
    "western sahara": "234",
    "yemen": "235",
    "zambia": "236",
    "zimbabwe": "237"
};

export default class addAddressPage {
    constructor(page) {
        this.page = page;
        this.addressLink = page.locator("//a[text()='Addresses']");
        this.verifyAddressPage = page.locator("//h1[text()='My account - Addresses']");
        this.addNewAddressButton = page.locator("//input[@type='button' and @value='Add new']");
        this.selectCountry = page.locator('#Address_CountryId');
        this.addressFirstName = page.locator('#Address_FirstName');
        this.addressLastName = page.locator('#Address_LastName');
        this.addressEmail = page.locator('#Address_Email');
        this.address1 = page.locator('#Address_Address1');
        this.city = page.locator('#Address_City');
        this.zipPostalCode = page.locator('#Address_ZipPostalCode');
        this.phoneNumber = page.locator('#Address_PhoneNumber');
        this.saveAddressButton = page.locator("//input[@type='submit' and @value='Save']");
        this.verifySavedAddress = page.locator("//div[@class='title']/strong[contains(text(),'J')]");
    }

    async clickOnAddressesLink() {
        await this.addressLink.click();
    }

    async verifyAddAddressPage() {
        await this.verifyAddressPage.waitFor({ state: 'visible' });
        await expect(this.verifyAddressPage).toBeVisible();
    }

    async clickOnAddNewAddress() {
        await this.addNewAddressButton.click();
    }


    async fillAddressDetails({
        FirstName,
        Email,
        LastName,
        Address1,
        City,
        ZipPostalCode,
        PhoneNumber,
        Country
    }) {

        // Select country by value
        await this.selectCountry.waitFor({ state: 'visible' });
        let contryName = Country.toLowerCase();
        await this.selectCountry.selectOption({ value: `${countryMap[contryName]}` });
        // Fill input fields
        await this.addressFirstName.fill(FirstName);
        await this.addressLastName.fill(LastName);
        await this.addressEmail.fill(Email);
        await this.address1.fill(Address1);
        await this.city.fill(City);
        await this.zipPostalCode.fill(ZipPostalCode);
        await this.phoneNumber.fill(PhoneNumber);
    }


    async verifySavedAddressInList() {
        await this.saveAddressButton.click();
        await this.verifySavedAddress.waitFor({ state: 'visible' });
        await expect(this.verifySavedAddress).toBeVisible();
    }
}
