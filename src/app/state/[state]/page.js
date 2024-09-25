"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DataTable from './DataTable.js'; 
import styles from './state.module.css';

const stateOptions = [
    {
        name: 'Andhra Pradesh',
        districts: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Prakasam', 'Srikakulam', 'Nellore', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa']
      },
      {
        name: 'Arunachal Pradesh',
        districts: ['Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang']
      },
      {
        name: 'Assam',
        districts: ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong']
      },
      {
        name: 'Bihar',
        districts: ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran']
      },
      {
        name: 'Chhattisgarh',
        districts: ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja']
      },
      {
        name: 'Goa',
        districts: ['North Goa', 'South Goa']
      },
      {
        name: 'Gujarat',
        districts: ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad']
      },
      {
        name: 'Haryana',
        districts: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar']
      },
      {
        name: 'Himachal Pradesh',
        districts: ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una']
      },
      {
        name: 'Jharkhand',
        districts: ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum']
      },
      {
        name: 'Karnataka',
        districts: ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir']
      },
      {
        name: 'Kerala',
        districts: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad']
      },
      {
        name: 'Madhya Pradesh',
        districts: ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha']
      },
      {
        name: 'Maharashtra',
        districts: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal']
      },
      {
        name: 'Manipur',
        districts: ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul']
      },
      {
        name: 'Meghalaya',
        districts: ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills']
      },
      {
        name: 'Mizoram',
        districts: ['Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Serchhip']
      },
      {
        name: 'Nagaland',
        districts: ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto']
      },
      {
        name: 'Odisha',
        districts: ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh']
      },
      {
        name: 'Punjab',
        districts: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'SAS Nagar', 'SBS Nagar', 'Tarn Taran']
      },
      {
        name: 'Rajasthan',
        districts: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur']
      },
      {
        name: 'Sikkim',
        districts: ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim']
      },
      {
        name: 'Tamil Nadu',
        districts: ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar']
      },
      {
        name: 'Telangana',
        districts: ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Kumuram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal–Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri']
      },
      {
        name: 'Tripura',
        districts: ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura']
      },
      {
        name: 'Uttar Pradesh',
        districts: ['Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi']
      },
      {
        name: 'Uttarakhand',
        districts: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi']
      },
      {
        name: 'West Bengal',
        districts: ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur']
      },
      {
        name: 'Andaman and Nicobar Islands',
        districts: ['Nicobar', 'North and Middle Andaman', 'South Andaman']
      },
      {
        name: 'Chandigarh',
        districts: ['Chandigarh']
      },
      {
        name: 'Dadra and Nagar Haveli and Daman and Diu',
        districts: ['Dadra and Nagar Haveli', 'Daman', 'Diu']
      },
      {
        name: 'Delhi',
        districts: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi']
      },
      {
        name: 'Jammu and Kashmir',
        districts: ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur']
      },
      {
        name: 'Ladakh',
        districts: ['Kargil', 'Leh']
      },
      {
        name: 'Lakshadweep',
        districts: ['Lakshadweep']
      },
      {
        name: 'Puducherry',
        districts: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam']
    }

  // Add more states and districts
];

const commodityOptions = [
    'Absinthe',
    'Ajwan',
    'Alasande Gram',
    'Almond(Badam)',
    'Alsandikai',
    'Amaranthus',
    'Ambada Seed',
    'Amla(Nelli Kai)',
    'Amphophalus',
    'Antawala',
    'Anthorium',
    'Apple',
    'Apricot(Jardalu/Khumani)',
    'Arecanut(Betelnut/Supari)',
    'Arhar (Tur/Red Gram)(Whole)',
    'Arhar Dal(Tur Dal)',
    'Asalia',
    'Ashgourd',
    'Ashwagandha',
    'Asparagus',
    'Astera',
    'Avare Dal',
    'BOP',
    'Bajra(Pearl Millet/Cumbu)',
    'Balekai',
    'Bamboo',
    'Banana',
    'Banana - Green',
    'Barley (Jau)',
    'Bay leaf (Tejpatta)',
    'Beans',
    'Beaten Rice',
    'Beetroot',
    'Bengal Gram Dal (Chana Dal)',
    'Bengal Gram(Gram)(Whole)',
    'Ber(Zizyphus/Borehannu)',
    'Betal Leaves',
    'Bhindi(Ladies Finger)',
    'Big Gram',
    'Binoula',
    'Bitter gourd',
    'Black Gram (Urd Beans)(Whole)',
    'Black Gram Dal (Urd Dal)',
    'Black pepper',
    'Borehannu',
    'Bottle gourd',
    'Brahmi',
    'Bran',
    'Brinjal',
    'Broken Rice',
    'Broomstick(Flower Broom)',
    'Bull',
    'Bullar',
    'Bunch Beans',
    'Butter',
    'Cabbage',
    'Calf',
    'Cane',
    'Capsicum',
    'Cardamoms',
    'Carnation',
    'Carrot',
    'Cashew Kernnel',
    'Cashewnuts',
    'Castor Oil',
    'Castor Seed',
    'Cauliflower',
    'Chakotha',
    'Chapparad Avare',
    'Chennangi (Whole)',
    'Chennangi Dal',
    'Cherry',
    'Chikoos(Sapota)',
    'Chili Red',
    'Chilly Capsicum',
    'Chow Chow',
    'Chrysanthemum',
    'Chrysanthemum(Loose)',
    'Cinamon(Dalchini)',
    'Cloves',
    'Cluster beans',
    'Coca',
    'Cock',
    'Cocoa',
    'Coconut',
    'Coconut Oil',
    'Coconut Seed',
    'Coffee',
    'Colacasia',
    'Copra',
    'Coriander(Leaves)',
    'Corriander seed',
    'Cotton',
    'Cotton Seed',
    'Cow',
    'Cowpea (Lobia/Karamani)',
    'Cowpea(Veg)',
    'Cucumbar(Kheera)',
    'Cummin Seed(Jeera)',
    'Custard Apple (Sharifa)',
    'Daila(Chandni)',
    'Dal (Avare)',
    'Dalda',
    'Delha',
    'Dhaincha',
    'Drumstick',
    'Dry Chillies',
    'Dry Fodder',
    'Dry Grapes',
    'Duck',
    'Duster Beans',
    'Egg',
    'Egypian Clover(Barseem)',
    'Elephant Yam (Suran)',
    'Field Pea',
    'Fig(Anjura/Anjeer)',
    'Firewood',
    'Fish',
    'Flower Broom',
    'Foxtail Millet(Navane)',
    'French Beans (Frasbean)',
    'Galgal(Lemon)',
    'Garlic',
    'Ghee',
    'Giloy',
    'Gingelly Oil',
    'Ginger(Dry)',
    'Ginger(Green)',
    'Gladiolus Bulb',
    'Gladiolus Cut Flower',
    'Goat',
    'Gram Raw(Chholia)',
    'Gramflour',
    'Grapes',
    'Green Avare (W)',
    'Green Chilli',
    'Green Fodder',
    'Green Gram (Moong)(Whole)',
    'Green Gram Dal (Moong Dal)',
    'Green Peas',
    'Ground Nut Oil',
    'Ground Nut Seed',
    'Groundnut',
    'Groundnut (Split)',
    'Groundnut pods (raw)',
    'Guar',
    'Guar Seed(Cluster Beans Seed)',
    'Guava',
    'Gur(Jaggery)',
    'Gurellu',
    'Haralekai',
    'He Buffalo',
    'Hen',
    'Hippe Seed',
    'Honey',
    'Honge seed',
    'Hybrid Cumbu',
    'Indian Beans (Seam)',
    'Indian Colza(Sarson)',
    'Isabgul (Psyllium)',
    'Jack Fruit',
    'Jaffri',
    'Jamamkhan',
    'Jamun(Narale Hannu)',
    'Jarbara',
    'Jasmine',
    'Javi',
    'Jowar(Sorghum)',
    'Jute',
    'Jute Seed',
    'Kabuli Chana(Chickpeas-White)',
    'Kacholam',
    'Kakada',
    'Kankambra',
    'Karamani',
    'Karbuja(Musk Melon)',
    'Kartali (Kantola)',
    'Kharif Mash',
    'Khoya',
    'Kinnow',
    'Knool Khol',
    'Kodo Millet(Varagu)',
    'Kuchur',
    'Kulthi(Horse Gram)',
    'Kutki',
    'Lak(Teora)',
    'Leafy Vegetable',
    'Lemon',
    'Lentil (Masur)(Whole)',
    'Lilly',
    'Lime',
    'Linseed',
    'Lint',
    'Litchi',
    'Little gourd (Kundru)',
    'Long Melon(Kakri)',
    'Lotus',
    'Lotus Sticks',
    'Lukad',
    'Mace',
    'Mahedi',
    'Mahua',
    'Mahua Seed(Hippe seed)',
    'Maida Atta',
    'Maize',
    'Mango',
    'Mango (Raw-Ripe)',
    'Maragensu',
    'Marasebu',
    'Marget',
    'Marigold(Calcutta)',
    'Marigold(loose)',
    'Mash',
    'Mashrooms',
    'Masur Dal',
    'Mataki',
    'Methi Seeds',
    'Methi(Leaves)',
    'Millets',
    'Mint(Pudina)',
    'Moath Dal',
    'Mousambi(Sweet Lime)',
    'Muesli',
    'Mustard',
    'Mustard Oil',
    'Myrobolan(Harad)',
    'Nearle Hannu',
    'Neem Seed',
    'Nelli Kai',
    'Niger Seed (Ramtil)',
    'Nutmeg',
    'Onion',
    'Onion Green',
    'Orange',
    'Orchid',
    'Other Pulses',
    'Other green and fresh vegetables',
    'ox',
    'Paddy(Dhan)(Basmati)',
    'Paddy(Dhan)(Common)',
    'Papaya',
    'Papaya (Raw)',
    'Patti Calcutta',
    'Peach',
    'Pear(Marasebu)',
    'Peas Wet',
    'Peas cod',
    'Peas(Dry)',
    'Pegeon Pea (Arhar Fali)',
    'Pepper garbled',
    'Pepper ungarbled',
    'Persimon(Japani Fal)',
    'Pigs',
    'Pineapple',
    'Plum',
    'Pointed gourd (Parval)',
    'Polherb',
    'Pomegranate',
    'potato',
    'Pumpkin',
    'Pundi',
    'Pundi Seed',
    'Pupadia',
    'Raddish',
    'Ragi (Finger Millet)',
    'Raibel',
    'Rajgir',
    'Ram',
    'Rat Tail Radish (Mogari)',
    'Raya',
    'Red Gram',
    'Resinwood',
    'Riccbcan',
    'Rice',
    'Ridgeguard(Tori)',
    'Rose(Local)',
    'Rose(Loose)',
    'Rose(Tata)',
    'Round gourd',
    'Rubber',
    'Sabu Dan',
    'Safflower',
    'Saffron',
    'Sajje',
    'Same/Savi',
    'Sarasum',
    'Season Leaves',
    'Seemebadnekai',
    'Seetapal',
    'Sesamum(Sesame,Gingelly,Til)',
    'She Buffalo',
    'She Goat',
    'Sheep',
    'Siddota',
    'Skin And Hide',
    'Snakeguard',
    'Soanf',
    'Soapnut(Antawala/Retha)',
    'Soji',
    'Sompu',
    'Soyabean',
    'Spinach',
    'Sponge gourd',
    'Squash(Chappal Kadoo)',
    'Sugar',
    'Sugarcane',
    'Sunflower',
    'Sunflower Seed',
  'Surat Beans (Papadi)',
  'Suva (Dill Seed)',
  'Suvarna Gadde',
  'Sweet Potato',
  'Sweet Pumpkin',
  'T.V. Cumbu',
  'Tamarind Fruit',
  'Tamarind Seed',
  'Tapioca',
  'Taramira',
  'Tea',
  'Tender Coconut',
  'Thinai (Italian Millet)',
  'Thogrikai',
  'Thondekai',
  'Tinda',
  'Tobacco',
  'Tomato',
  'Torchwood',
  'Toria',
  'Tube Flower',
  'Tube Rose(Double)',
  'Tube Rose(Loose)',
  'Tube Rose(Single)',
  'Turmeric',
  'Turmeric (raw)',
  'Turnip',
  'Walnut',
  'Water Melon',
  'Wheat',
  'Wheat Atta',
  'White Muesli',
  'White Peas',
  'White Pumpkin',
  'Wood',
  'Wool',
  'Yam',
  'Yam (Ratalu)',
  'basil',
  'buttery',
  'dhawai flowers',
  'dried mango',
  'gulli',
  'karanja seeds',
  'mango powder',
  'nigella seeds',
  'poppy seeds',
  'stevia'
];

  



const StatePage = ({ params }) => {
  const { state } = params; // Get the state from the URL
  const [district, setDistrict] = useState('');
  const [commodity, setCommodity] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    // Find the state's districts
    const selectedState = stateOptions.find((option) => option.name === state);
    if (selectedState) {
      setDistrictOptions(selectedState.districts);
    }
  }, [state]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let apiUrl = `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=579b464db66ec23bdd00000188a4a515f9a84fb7743993fb436e1c44&format=json`;

    const filters = [];
    if (district) filters.push(`filters%5BDistrict.keyword%5D=${encodeURIComponent(district)}`);
    if (commodity) filters.push(`filters%5BCommodity.keyword%5D=${encodeURIComponent(commodity)}`);
    if (arrivalDate) filters.push(`filters%5BArrival_Date%5D=${encodeURIComponent(arrivalDate)}`);

    if (filters.length > 0) {
      apiUrl += '&' + filters.join('&');
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Select Filters for {state}</h1>
      <form onSubmit={handleSubmit}>
        {/* District Dropdown */}
        <div className={styles.dropdownContainer}>
        <label className={styles.label}>District:</label>
        <select
          className={styles.select}
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">Select District</option>
          {districtOptions.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Commodity Dropdown */}
      <div className={styles.dropdownContainer}>
        <label className={styles.label}>Commodity:</label>
        <select
          className={styles.select}
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
        >
          <option value="">Select Commodity</option>
          {commodityOptions.map((commodity) => (
            <option key={commodity} value={commodity}>
              {commodity}
            </option>
          ))}
        </select>
      </div>
        {/* Arrival Date */}
        {/* <div>
          <label>Arrival Date: </label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div> */}

        <button type="submit">Fetch Data</button>
      </form>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p>{error}</p>}

      {/* Display the fetched data */}
      {data && (
        <DataTable data={data.records} />
      )}
    </div>
  );
};

export default StatePage;
