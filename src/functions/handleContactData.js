import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";

export const countryPhoneCodes = [
  { country: "Afghanistan", code: "+93", iso: "AF" },
  { country: "Albania", code: "+355", iso: "AL" },
  { country: "Algeria", code: "+213", iso: "DZ" },
  { country: "American Samoa", code: "+1-684", iso: "AS" },
  { country: "Andorra", code: "+376", iso: "AD" },
  { country: "Angola", code: "+244", iso: "AO" },
  { country: "Anguilla", code: "+1-264", iso: "AI" },
  { country: "Antarctica", code: "+672", iso: "AQ" },
  { country: "Antigua and Barbuda", code: "+1-268", iso: "AG" },
  { country: "Argentina", code: "+54", iso: "AR" },
  { country: "Armenia", code: "+374", iso: "AM" },
  { country: "Aruba", code: "+297", iso: "AW" },
  { country: "Australia", code: "+61", iso: "AU" },
  { country: "Austria", code: "+43", iso: "AT" },
  { country: "Azerbaijan", code: "+994", iso: "AZ" },
  { country: "Bahamas", code: "+1-242", iso: "BS" },
  { country: "Bahrain", code: "+973", iso: "BH" },
  { country: "Bangladesh", code: "+880", iso: "BD" },
  { country: "Barbados", code: "+1-246", iso: "BB" },
  { country: "Belarus", code: "+375", iso: "BY" },
  { country: "Belgium", code: "+32", iso: "BE" },
  { country: "Belize", code: "+501", iso: "BZ" },
  { country: "Benin", code: "+229", iso: "BJ" },
  { country: "Bermuda", code: "+1-441", iso: "BM" },
  { country: "Bhutan", code: "+975", iso: "BT" },
  { country: "Bolivia", code: "+591", iso: "BO" },
  { country: "Bosnia and Herzegovina", code: "+387", iso: "BA" },
  { country: "Botswana", code: "+267", iso: "BW" },
  { country: "Brazil", code: "+55", iso: "BR" },
  { country: "British Indian Ocean Territory", code: "+246", iso: "IO" },
  { country: "British Virgin Islands", code: "+1-284", iso: "VG" },
  { country: "Brunei", code: "+673", iso: "BN" },
  { country: "Bulgaria", code: "+359", iso: "BG" },
  { country: "Burkina Faso", code: "+226", iso: "BF" },
  { country: "Burundi", code: "+257", iso: "BI" },
  { country: "Cambodia", code: "+855", iso: "KH" },
  { country: "Cameroon", code: "+237", iso: "CM" },
  { country: "Canada", code: "+1", iso: "CA" },
  { country: "Cape Verde", code: "+238", iso: "CV" },
  { country: "Cayman Islands", code: "+1-345", iso: "KY" },
  { country: "Central African Republic", code: "+236", iso: "CF" },
  { country: "Chad", code: "+235", iso: "TD" },
  { country: "Chile", code: "+56", iso: "CL" },
  { country: "China", code: "+86", iso: "CN" },
  { country: "Christmas Island", code: "+61", iso: "CX" },
  { country: "Cocos Islands", code: "+61", iso: "CC" },
  { country: "Colombia", code: "+57", iso: "CO" },
  { country: "Comoros", code: "+269", iso: "KM" },
  { country: "Cook Islands", code: "+682", iso: "CK" },
  { country: "Costa Rica", code: "+506", iso: "CR" },
  { country: "Croatia", code: "+385", iso: "HR" },
  { country: "Cuba", code: "+53", iso: "CU" },
  { country: "Curacao", code: "+599", iso: "CW" },
  { country: "Cyprus", code: "+357", iso: "CY" },
  { country: "Czech Republic", code: "+420", iso: "CZ" },
  { country: "Democratic Republic of the Congo", code: "+243", iso: "CD" },
  { country: "Denmark", code: "+45", iso: "DK" },
  { country: "Djibouti", code: "+253", iso: "DJ" },
  { country: "Dominica", code: "+1-767", iso: "DM" },
  { country: "Dominican Republic", code: "+1-809", iso: "DO" },
  { country: "Dominican Republic", code: "+1-829", iso: "DO" },
  { country: "Dominican Republic", code: "+1-849", iso: "DO" },
  { country: "East Timor", code: "+670", iso: "TL" },
  { country: "Ecuador", code: "+593", iso: "EC" },
  { country: "Egypt", code: "+20", iso: "EG" },
  { country: "El Salvador", code: "+503", iso: "SV" },
  { country: "Equatorial Guinea", code: "+240", iso: "GQ" },
  { country: "Eritrea", code: "+291", iso: "ER" },
  { country: "Estonia", code: "+372", iso: "EE" },
  { country: "Ethiopia", code: "+251", iso: "ET" },
  { country: "Falkland Islands", code: "+500", iso: "FK" },
  { country: "Faroe Islands", code: "+298", iso: "FO" },
  { country: "Fiji", code: "+679", iso: "FJ" },
  { country: "Finland", code: "+358", iso: "FI" },
  { country: "France", code: "+33", iso: "FR" },
  { country: "French Polynesia", code: "+689", iso: "PF" },
  { country: "Gabon", code: "+241", iso: "GA" },
  { country: "Gambia", code: "+220", iso: "GM" },
  { country: "Georgia", code: "+995", iso: "GE" },
  { country: "Germany", code: "+49", iso: "DE" },
  { country: "Ghana", code: "+233", iso: "GH" },
  { country: "Gibraltar", code: "+350", iso: "GI" },
  { country: "Greece", code: "+30", iso: "GR" },
  { country: "Greenland", code: "+299", iso: "GL" },
  { country: "Grenada", code: "+1-473", iso: "GD" },
  { country: "Guam", code: "+1-671", iso: "GU" },
  { country: "Guatemala", code: "+502", iso: "GT" },
  { country: "Guernsey", code: "+44-1481", iso: "GG" },
  { country: "Guinea", code: "+224", iso: "GN" },
  { country: "Guinea-Bissau", code: "+245", iso: "GW" },
  { country: "Guyana", code: "+592", iso: "GY" },
  { country: "Haiti", code: "+509", iso: "HT" },
  { country: "Honduras", code: "+504", iso: "HN" },
  { country: "Hong Kong", code: "+852", iso: "HK" },
  { country: "Hungary", code: "+36", iso: "HU" },
  { country: "Iceland", code: "+354", iso: "IS" },
  { country: "India", code: "+91", iso: "IN" },
  { country: "Indonesia", code: "+62", iso: "ID" },
  { country: "Iran", code: "+98", iso: "IR" },
  { country: "Iraq", code: "+964", iso: "IQ" },
  { country: "Ireland", code: "+353", iso: "IE" },
  { country: "Isle of Man", code: "+44-1624", iso: "IM" },
  { country: "Israel", code: "+972", iso: "IL" },
  { country: "Italy", code: "+39", iso: "IT" },
  { country: "Ivory Coast", code: "+225", iso: "CI" },
  { country: "Jamaica", code: "+1-876", iso: "JM" },
  { country: "Japan", code: "+81", iso: "JP" },
  { country: "Jersey", code: "+44-1534", iso: "JE" },
  { country: "Jordan", code: "+962", iso: "JO" },
  { country: "Kazakhstan", code: "+7", iso: "KZ" },
  { country: "Kenya", code: "+254", iso: "KE" },
  { country: "Kiribati", code: "+686", iso: "KI" },
  { country: "Kosovo", code: "+383", iso: "XK" },
  { country: "Kuwait", code: "+965", iso: "KW" },
  { country: "Kyrgyzstan", code: "+996", iso: "KG" },
  { country: "Laos", code: "+856", iso: "LA" },
  { country: "Latvia", code: "+371", iso: "LV" },
  { country: "Lebanon", code: "+961", iso: "LB" },
  { country: "Lesotho", code: "+266", iso: "LS" },
  { country: "Liberia", code: "+231", iso: "LR" },
  { country: "Libya", code: "+218", iso: "LY" },
  { country: "Liechtenstein", code: "+423", iso: "LI" },
  { country: "Lithuania", code: "+370", iso: "LT" },
  { country: "Luxembourg", code: "+352", iso: "LU" },
  { country: "Macao", code: "+853", iso: "MO" },
  { country: "Macedonia", code: "+389", iso: "MK" },
  { country: "Madagascar", code: "+261", iso: "MG" },
  { country: "Malawi", code: "+265", iso: "MW" },
  { country: "Malaysia", code: "+60", iso: "MY" },
  { country: "Maldives", code: "+960", iso: "MV" },
  { country: "Mali", code: "+223", iso: "ML" },
  { country: "Malta", code: "+356", iso: "MT" },
  { country: "Marshall Islands", code: "+692", iso: "MH" },
  { country: "Mauritania", code: "+222", iso: "MR" },
  { country: "Mauritius", code: "+230", iso: "MU" },
  { country: "Mayotte", code: "+262", iso: "YT" },
  { country: "Mexico", code: "+52", iso: "MX" },
  { country: "Micronesia", code: "+691", iso: "FM" },
  { country: "Moldova", code: "+373", iso: "MD" },
  { country: "Monaco", code: "+377", iso: "MC" },
  { country: "Mongolia", code: "+976", iso: "MN" },
  { country: "Montenegro", code: "+382", iso: "ME" },
  { country: "Montserrat", code: "+1-664", iso: "MS" },
  { country: "Morocco", code: "+212", iso: "MA" },
  { country: "Mozambique", code: "+258", iso: "MZ" },
  { country: "Myanmar", code: "+95", iso: "MM" },
  { country: "Namibia", code: "+264", iso: "NA" },
  { country: "Nauru", code: "+674", iso: "NR" },
  { country: "Nepal", code: "+977", iso: "NP" },
  { country: "Netherlands", code: "+31", iso: "NL" },
  { country: "Netherlands Antilles", code: "+599", iso: "AN" },
  { country: "New Caledonia", code: "+687", iso: "NC" },
  { country: "New Zealand", code: "+64", iso: "NZ" },
  { country: "Nicaragua", code: "+505", iso: "NI" },
  { country: "Niger", code: "+227", iso: "NE" },
  { country: "Nigeria", code: "+234", iso: "NG" },
  { country: "Niue", code: "+683", iso: "NU" },
  { country: "North Korea", code: "+850", iso: "KP" },
  { country: "Northern Mariana Islands", code: "+1-670", iso: "MP" },
  { country: "Norway", code: "+47", iso: "NO" },
  { country: "Oman", code: "+968", iso: "OM" },
  { country: "Pakistan", code: "+92", iso: "PK" },
  { country: "Palau", code: "+680", iso: "PW" },
  { country: "Palestine", code: "+970", iso: "PS" },
  { country: "Panama", code: "+507", iso: "PA" },
  { country: "Papua New Guinea", code: "+675", iso: "PG" },
  { country: "Paraguay", code: "+595", iso: "PY" },
  { country: "Peru", code: "+51", iso: "PE" },
  { country: "Philippines", code: "+63", iso: "PH" },
  { country: "Pitcairn", code: "+64", iso: "PN" },
  { country: "Poland", code: "+48", iso: "PL" },
  { country: "Portugal", code: "+351", iso: "PT" },
  { country: "Puerto Rico", code: "+1-787, 1-939", iso: "PR" },
  { country: "Qatar", code: "+974", iso: "QA" },
  { country: "Republic of the Congo", code: "+242", iso: "CG" },
  { country: "Reunion", code: "+262", iso: "RE" },
  { country: "Romania", code: "+40", iso: "RO" },
  { country: "Russia", code: "+7", iso: "RU" },
  { country: "Rwanda", code: "+250", iso: "RW" },
  { country: "Saint Barthelemy", code: "+590", iso: "BL" },
  { country: "Saint Helena", code: "+290", iso: "SH" },
  { country: "Saint Kitts and Nevis", code: "+1-869", iso: "KN" },
  { country: "Saint Lucia", code: "+1-758", iso: "LC" },
  { country: "Saint Martin", code: "+590", iso: "MF" },
  { country: "Saint Pierre and Miquelon", code: "+508", iso: "PM" },
  { country: "Saint Vincent and the Grenadines", code: "+1-784", iso: "VC" },
  { country: "Samoa", code: "+685", iso: "WS" },
  { country: "San Marino", code: "+378", iso: "SM" },
  { country: "Sao Tome and Principe", code: "+239", iso: "ST" },
  { country: "Saudi Arabia", code: "+966", iso: "SA" },
  { country: "Senegal", code: "+221", iso: "SN" },
  { country: "Serbia", code: "+381", iso: "RS" },
  { country: "Seychelles", code: "+248", iso: "SC" },
  { country: "Sierra Leone", code: "+232", iso: "SL" },
  { country: "Singapore", code: "+65", iso: "SG" },
  { country: "Sint Maarten", code: "+1-721", iso: "SX" },
  { country: "Slovakia", code: "+421", iso: "SK" },
  { country: "Slovenia", code: "+386", iso: "SI" },
  { country: "Solomon Islands", code: "+677", iso: "SB" },
  { country: "Somalia", code: "+252", iso: "SO" },
  { country: "South Africa", code: "+27", iso: "ZA" },
  { country: "South Korea", code: "+82", iso: "KR" },
  { country: "South Sudan", code: "+211", iso: "SS" },
  { country: "Spain", code: "+34", iso: "ES" },
  { country: "Sri Lanka", code: "+94", iso: "LK" },
  { country: "Sudan", code: "+249", iso: "SD" },
  { country: "Suriname", code: "+597", iso: "SR" },
  { country: "Svalbard and Jan Mayen", code: "+47", iso: "SJ" },
  { country: "Swaziland", code: "+268", iso: "SZ" },
  { country: "Sweden", code: "+46", iso: "SE" },
  { country: "Switzerland", code: "+41", iso: "CH" },
  { country: "Syria", code: "+963", iso: "SY" },
  { country: "Taiwan", code: "+886", iso: "TW" },
  { country: "Tajikistan", code: "+992", iso: "TJ" },
  { country: "Tanzania", code: "+255", iso: "TZ" },
  { country: "Thailand", code: "+66", iso: "TH" },
  { country: "Togo", code: "+228", iso: "TG" },
  { country: "Tokelau", code: "+690", iso: "TK" },
  { country: "Tonga", code: "+676", iso: "TO" },
  { country: "Trinidad and Tobago", code: "+1-868", iso: "TT" },
  { country: "Tunisia", code: "+216", iso: "TN" },
  { country: "Turkey", code: "+90", iso: "TR" },
  { country: "Turkmenistan", code: "+993", iso: "TM" },
  { country: "Turks and Caicos Islands", code: "+1-649", iso: "TC" },
  { country: "Tuvalu", code: "+688", iso: "TV" },
  { country: "U.S. Virgin Islands", code: "+1-340", iso: "VI" },
  { country: "Uganda", code: "+256", iso: "UG" },
  { country: "Ukraine", code: "+380", iso: "UA" },
  { country: "United Arab Emirates", code: "+971", iso: "AE" },
  { country: "United Kingdom", code: "+44", iso: "GB" },
  { country: "United States", code: "+1", iso: "US" },
  { country: "Uruguay", code: "+598", iso: "UY" },
  { country: "Uzbekistan", code: "+998", iso: "UZ" },
  { country: "Vanuatu", code: "+678", iso: "VU" },
  { country: "Vatican", code: "+379", iso: "VA" },
  { country: "Venezuela", code: "+58", iso: "VE" },
  { country: "Vietnam", code: "+84", iso: "VN" },
  { country: "Wallis and Futuna", code: "+681", iso: "WF" },
  { country: "Western Sahara", code: "+212", iso: "EH" },
  { country: "Yemen", code: "+967", iso: "YE" },
  { country: "Zambia", code: "+260", iso: "ZM" },
  { country: "Zimbabwe", code: "+263", iso: "ZW" },
];

export const getCountryPhoneCodes = () => {
  const _countryPhoneCodes = [];

  countryPhoneCodes.forEach((code) => {
    _countryPhoneCodes.push({
      label: code.country + " | " + code.code + " | " + code.iso,
      value: code.code,
    });
  });

  return _countryPhoneCodes;
};

export const addContact = async (data) => {
  //
  if (data === undefined || data === null || typeof data !== "object") {
    //
    Alert.alert(
      "Failed",
      "Failed to add new contact. Invalid data: " + JSON.stringify(data)
    );
    return;
    //
  }
  //
  //
  try {
    const jsonValue = await AsyncStorage.getItem("contacts_data");
    all_contact_data = jsonValue != null ? JSON.parse(jsonValue) : [];
    //
    try {
      let lastID = null;

      if (typeof all_contact_data === "object") {
        if (all_contact_data.length !== 0) {
          lastID =
            parseInt(all_contact_data[all_contact_data.length - 1].id) + 1;
        } else {
          lastID = 1;
          all_contact_data = [];
        }
      } else {
        lastID = 1;
        all_contact_data = [];
      }

      data["id"] = lastID;
      all_contact_data.push(data);

      const jsonValue = JSON.stringify(all_contact_data);
      await AsyncStorage.setItem("contacts_data", jsonValue);
      return;
    } catch (e) {
      Alert.alert(
        "Failed",
        "'" + data.name + "' could not be added: " + e.message
      );
    }
  } catch (e) {}
};

export const getContacts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("contacts_data");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return [];
  }
};

export const getContactByID = async (id) => {
  try {
    const jsonString = await AsyncStorage.getItem("contacts_data");
    const jsonValue = jsonString != null ? JSON.parse(jsonString) : [];
    let contactInformation = {};
    if (jsonValue !== null) {
      jsonValue.forEach((contact, index) => {
        if (parseInt(contact.id) === parseInt(id)) {
          contactInformation = contact;
        }
      });
    }
    return contactInformation;
  } catch (e) {
    return [];
  }
};

export const updateContactData = async (update_this_contact) => {
  try {
    const jsonString = await AsyncStorage.getItem("contacts_data");
    const jsonValue = jsonString !== null ? JSON.parse(jsonString) : [];
    const new_contact_list = [];

    if (jsonValue !== null && jsonValue !== undefined) {
      jsonValue.forEach((contact, index) => {
        if (parseInt(contact.id) === parseInt(update_this_contact.id)) {
          new_contact_list.push(update_this_contact);
        } else {
          new_contact_list.push(contact);
        }
      });

      const newJsonValue = JSON.stringify(new_contact_list);
      await AsyncStorage.setItem("contacts_data", newJsonValue);
    } else {
      Alert.alert(
        "'" + update_this_contact.name + "' could not be updated",
        e.message
      );
    }
  } catch (e) {
    Alert.alert(
      "'" + update_this_contact.name + "' could not be updated",
      e.message
    );
  }
};

export const deleteContactData = async (update_this_contact) => {
  try {
    const jsonString = await AsyncStorage.getItem("contacts_data");
    const jsonValue = jsonString !== null ? JSON.parse(jsonString) : [];
    const new_contact_list = [];

    if (jsonValue !== null && jsonValue !== undefined) {
      jsonValue.forEach((contact, index) => {
        if (parseInt(contact.id) !== parseInt(update_this_contact.id)) {
          new_contact_list.push(contact);
        }
      });

      const newJsonValue = JSON.stringify(new_contact_list);
      await AsyncStorage.setItem("contacts_data", newJsonValue);
    } else {
      Alert.alert(
        "'" + update_this_contact.name + "' could not be deleted",
        e.message
      );
    }
  } catch (e) {
    Alert.alert(
      "'" + update_this_contact.name + "' could not be deleted",
      e.message
    );
  }
};

export const clearContacts = async () => {
  try {
    await AsyncStorage.removeItem("contacts_data");
    Alert.alert(
      "Contacts Deleted",
      "All contacts have been deleted successfully."
    );
  } catch (e) {
    return [];
  }
};

//
//
//
//
export const copyToClipboard = async (text) => {
  await Clipboard.setStringAsync(text);
};
//
export const openWebLink = (link) => {
  Linking.openURL(link).catch((error) =>
    console.error("Error opening link:", error)
  );
};
//
export const openPhoneApp = (formattedPhoneNumber) => {
  // const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  const url = `tel:${formattedPhoneNumber}`;
  Linking.openURL(url).catch((error) =>
    console.error("Error opening phone app:", error)
  );
};
//
export const openWhatsAppWithMessage = (formattedPhoneNumber, message) => {
  // const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  const encodedMessage = encodeURIComponent(message); // Encode the message for the URL
  const url = `whatsapp://send?phone=${formattedPhoneNumber}&text=${encodedMessage}`;
  Linking.openURL(url).catch((error) =>
    console.error("Error opening WhatsApp:", error)
  );
};
//
export const openEmailApp = (toEmail, subject, body) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const url = `mailto:${toEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  Linking.openURL(url).catch((error) =>
    console.error("Error opening email app:", error)
  );
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
export const generateContacts = () => {
  //
  const prospectsIndex = Math.floor(Math.random() * 10);
  //
  const name = [
    "TechVista Solutions",
    "GreenLeaf Organics",
    "CreativeCraft Studios",
    "FusionFlavors Catering",
    "Sparkling Innovations",
    "UrbanElegance Boutique",
    "HealthHarbor Wellness",
    "PixelPerfect Design Co.",
    "Nature's Glow Spa",
    "Quantum Dynamics Consulting",
  ][prospectsIndex];
  //
  const notes = [
    "Reached out via email; waiting for response.",
    "Had a great conversation about their needs.",
    "Scheduled a meeting for next week to discuss their requirements.",
    "Talked about their budget constraints; need to find a suitable solution.",
    "Need to follow up on their specific questions about our services.",
    "Client mentioned considering our competitor; need to highlight our unique value proposition.",
    "Identified John Smith as the key decision maker in the organization.",
    "Client expressed interest in a product demo; set up a demo session.",
    "Received positive feedback from client on our presentation.",
    "Sent the proposal document outlining our offerings and pricing.",
  ][Math.floor(Math.random() * 10)];
  //
  const email = [
    "techvistasolutions596@example.com",
    "greenleaforganics129@example.com",
    "creativecraftstudios387@example.com",
    "fusionflavorscatering758@example.com",
    "sparklinginnovations124@example.com",
    "urbaneleganceboutique846@example.com",
    "healthharborwellness789@example.com",
    "pixelperfectdesignco532@example.com",
    "naturesglowspa667@example.com",
    "quantumdynamicsconsulting915@example.com",
  ][prospectsIndex];
  //
  const number = [
    "601234567",
    "729876543",
    "734567890",
    "823456789",
    "839876543",
    "745678901",
    "712345678",
    "798765432",
    "823456789",
    "765432109",
  ][Math.floor(Math.random() * 10)];
  //
  const whatsap = [
    "601234567",
    "729876543",
    "734567890",
    "823456789",
    "839876543",
    "745678901",
    "712345678",
    "798765432",
    "823456789",
    "765432109",
  ][Math.floor(Math.random() * 10)];
  //
  const other_fields = [];
  other_fields.push({
    name: "Website",
    value: [
      "https://www.techvistasolutions.com",
      "https://www.greenleaforganics.com",
      "https://www.creativecraftstudios.com",
      "https://www.fusionflavorscatering.com",
      "https://www.sparklinginnovations.com",
      "https://www.urbaneleganceboutique.com",
      "https://www.healthharborwellness.com",
      "https://www.pixelperfectdesignco.com",
      "https://www.naturesglowspa.com",
      "https://www.quantumdynamicsconsulting.com",
    ][prospectsIndex],
  });
  //
  other_fields.push({
    name: "LinkedIn",
    value: [
      "https://www.linkedin.com/in/johndoe",
      "https://www.linkedin.com/in/janesmith",
      "https://www.linkedin.com/in/markjohnson",
      "https://www.linkedin.com/in/emilybrown",
      "https://www.linkedin.com/in/michaeltaylor",
      "https://www.linkedin.com/in/sarahlee",
      "https://www.linkedin.com/in/robertwilson",
      "https://www.linkedin.com/in/olivialopez",
      "https://www.linkedin.com/in/davidmartinez",
      "https://www.linkedin.com/in/alexanderwang",
    ][Math.floor(Math.random() * 10)],
  });
  //
  other_fields.push({
    name: "Facebook",
    value: [
      "https://www.facebook.com/techvistasolutions",
      "https://www.facebook.com/greenleaforganics",
      "https://www.facebook.com/creativecraftstudios",
      "https://www.facebook.com/fusionflavorscatering",
      "https://www.facebook.com/sparklinginnovations",
      "https://www.facebook.com/urbaneleganceboutique",
      "https://www.facebook.com/healthharborwellness",
      "https://www.facebook.com/pixelperfectdesignco",
      "https://www.facebook.com/naturesglowspa",
      "https://www.facebook.com/quantumdynamicsconsulting",
    ][prospectsIndex],
  });
  //
  other_fields.push({
    name: "Instagram",
    value: [
      "https://www.instagram.com/techvistasolutions",
      "https://www.instagram.com/greenleaforganics",
      "https://www.instagram.com/creativecraftstudios",
      "https://www.instagram.com/fusionflavorscatering",
      "https://www.instagram.com/sparklinginnovations",
      "https://www.instagram.com/urbaneleganceboutique",
      "https://www.instagram.com/healthharborwellness",
      "https://www.instagram.com/pixelperfectdesignco",
      "https://www.instagram.com/naturesglowspa",
      "https://www.instagram.com/quantumdynamicsconsulting",
    ][prospectsIndex],
  });
  //
  other_fields.push({
    name: "Twitter",
    value: [
      "https://www.twitter.com/techvistasolutions",
      "https://www.twitter.com/greenleaforganics",
      "https://www.twitter.com/creativecraftstudios",
      "https://www.twitter.com/fusionflavorscatering",
      "https://www.twitter.com/sparklinginnovations",
      "https://www.twitter.com/urbaneleganceboutique",
      "https://www.twitter.com/healthharborwellness",
      "https://www.twitter.com/pixelperfectdesignco",
      "https://www.twitter.com/naturesglowspa",
      "https://www.twitter.com/quantumdynamicsconsulting",
    ][prospectsIndex],
  });
  //
  other_fields.push({
    name: "Address",
    value: [
      "1234 Main Street, Johannesburg, Gauteng, 2000",
      "5678 Oak Avenue, Cape Town, Western Cape, 8000",
      "9876 Pine Road, Durban, KwaZulu-Natal, 4001",
      "4321 Maple Lane, Pretoria, Gauteng, 0181",
      "8765 Cedar Street, Port Elizabeth, Eastern Cape, 6001",
      "5432 Elm Close, Bloemfontein, Free State, 9301",
      "3456 Willow Drive, Pietermaritzburg, KwaZulu-Natal, 3201",
      "7890 Acacia Crescent, East London, Eastern Cape, 5201",
      "6543 Birch Avenue, Nelspruit, Mpumalanga, 1200",
      "2109 Redwood Street, Polokwane, Limpopo, 0700",
    ][Math.floor(Math.random() * 10)],
  });
  //
  return {
    id: 0,
    name: name,
    email: email,
    number: number,
    whatsapp: whatsap,
    notes: notes,
    other_fields: other_fields,
    whatsapp_country_code:
      countryPhoneCodes[
        Math.floor(Math.random() * countryPhoneCodes.length - 1)
      ],
    number_country_code:
      countryPhoneCodes[
        Math.floor(Math.random() * countryPhoneCodes.length - 1)
      ],
  };
};

//
export const sortAndGroupByName = (data) => {
  const sortedArray = data.sort((a, b) => a.name.localeCompare(b.name));
  const groupedObject = {};
  sortedArray.forEach((item) => {
    const firstLetter = item.name[0].toLowerCase();
    if (!groupedObject[firstLetter]) {
      groupedObject[firstLetter] = [];
    }
    groupedObject[firstLetter].push(item);
  });

  return groupedObject;
};

//
export const searchItems = async (searchTerm) => {
  const contacts = await getContacts();
  if (
    searchTerm !== undefined &&
    searchTerm !== null &&
    searchTerm !== "" &&
    searchTerm.trim().length >= 1
  ) {
    if (
      typeof contacts === "object" &&
      contacts?.length > 0 &&
      contacts !== null &&
      contacts !== undefined
    ) {
      const matchingItems = contacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.whatsapp.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.notes[0].toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      if (matchingItems.length > 0) {
        return sortAndGroupByName(matchingItems);
      }

      return [];
    }

    // Handle other cases, e.g., when contacts is not an array
    return sortAndGroupByName(contacts);
  } else {
    return sortAndGroupByName(contacts);
  }
};

//
export const validateEmail = (_email) => {
  const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return res.test(String(_email).toLowerCase());
};
//
export const validateContactData = (key, value, type) => {
  //
  const keyName = {
    name: "Name",
    number: "Contact Number",
    whatsapp: "Whatsapp Number",
    email: "Email",
    notes: "Note",
  };
  const VALID_KEYS_ARRAY = ["name", "number", "whatsapp", "email", "notes"];
  //
  let BOOL_KEY_RESULT = false;
  let BOOL_VALUE_RESULT = false;
  let BOOL_MESSAGE = [];
  //
  if (key !== null && key !== undefined && typeof key === "string") {
    if (VALID_KEYS_ARRAY.indexOf(key) !== -1) {
      BOOL_KEY_RESULT = true;
      //
      //
      try {
        switch (type) {
          case "text":
            const clean_value = value.trim();
            if (
              clean_value !== null &&
              clean_value !== undefined &&
              typeof clean_value === "string"
            ) {
              if (clean_value.length >= 1) {
                BOOL_VALUE_RESULT = true;
              } else {
                BOOL_MESSAGE.push("Enter a valid " + keyName[key] + "");
              }
            } else {
              BOOL_MESSAGE.push("This is not a valid '" + keyName[key] + "'");
            }
            break;

          default:
            BOOL_KEY_RESULT = false;
            BOOL_VALUE_RESULT = false;
            BOOL_MESSAGE.push(
              "This can't be validated as '" + keyName[key] + "'"
            );
            break;
        }
        //
      } catch (error) {
        BOOL_VALUE_RESULT = false;
        BOOL_MESSAGE.push("This can't be used as '" + keyName[key] + "'");
      }
    }
  } else {
    BOOL_MESSAGE.push("Please enter a valid name.");
  }
  //
  const return_result = {
    result: BOOL_KEY_RESULT && BOOL_VALUE_RESULT,
    message: BOOL_MESSAGE,
  };
  //
  return return_result;
};
