// ==UserScript==
// @name         Netflix Hidden Categories
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds links to Netflix's weirdly-specific hidden categories.
// @author       Alessio (github.com/alessiovierti)
// @match        https://www.netflix.com/browse*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @downloadUrl  https://github.com/alessiovierti/netflix-hidden-categories/releases/latest/download/netflix-hidden-categories.user.js
// @updateUrl    https://github.com/alessiovierti/netflix-hidden-categories/releases/latest/download/netflix-hidden-categories.user.js
// ==/UserScript==

(function() {
    'use strict';

    const BASE_PATH = "https://www.netflix.com/";
    const CATEGORY_PATH = BASE_PATH + "browse/genre/";

    const HIDDEN_CATEGORIES = [

        // Each item is a category group:
        [
            // The first item is the parent of the category group:
            {id: "1365" , name: "Action & Adventure"},
            {id: "77232" , name: "Asian Action Movies"},
            {id: "46576" , name: "Classic Action & Adventure"},
            {id: "43040" , name: "Action Comedies"},
            {id: "43048" , name: "Action Thrillers"},
            {id: "7442" , name: "Adventures"},
            {id: "10118" , name: "Comic Book and Superhero Movies"},
            {id: "7700" , name: "Westerns"},
            {id: "10702" , name: "Spy Action & Adventure"},
            {id: "9584" , name: "Crime Action & Adventure"},
            {id: "11828" , name: "Foreign Action & Adventure"},
            {id: "8985" , name: "Martial Arts Movies"},
            {id: "2125" , name: "Military Action & Adventure"}
        ],
        [
            {id: "7424" , name: "Anime"},
            {id: "11881" , name: "Adult Animation"},
            {id: "2653" , name: "Anime Action"},
            {id: "9302" , name: "Anime Comedies"},
            {id: "452" , name: "Anime Dramas"},
            {id: "3063" , name: "Anime Features"},
            {id: "2729" , name: "Anime Sci-Fi"},
            {id: "10695" , name: "Anime Horror"},
            {id: "11146" , name: "Anime Fantasy"},
            {id: "6721" , name: "Anime Series"}
        ],
        [
            {id: "783" , name: "Children & Family Movies"},
            {id: "6796" , name: "Movies for ages 0 to 2"},
            {id: "6218" , name: "Movies for ages 2 to 4"},
            {id: "5455" , name: "Movies for ages 5 to 7"},
            {id: "561" , name: "Movies for ages 8 to 10"},
            {id: "6962" , name: "Movies for ages 11 to 12"},
            {id: "10659" , name: "Education for Kids"},
            {id: "67673" , name: "Disney"},
            {id: "10056" , name: "Movies based on children's books"},
            {id: "51056" , name: "Family Features"},
            {id: "11177" , name: "TV Cartoons"},
            {id: "27346" , name: "Kids' TV"},
            {id: "52843" , name: "Kids Music"},
            {id: "5507" , name: "Animal Tales"}
        ],
        [
            {id: "31574" , name: "Classic Movies"},
            {id: "31694" , name: "Classic Comedies"},
            {id: "29809" , name: "Classic Dramas"},
            {id: "47147" , name: "Classic Sci-Fi & Fantasy"},
            {id: "46588" , name: "Classic Thrillers"},
            {id: "7687" , name: "Film Noir"},
            {id: "48744" , name: "Classic War Movies"},
            {id: "52858" , name: "Epics"},
            {id: "32473" , name: "Classic Foreign Movies"},
            {id: "53310" , name: "Silent Movies"},
            {id: "47465" , name: "Classic Westerns"}
        ],
        [
            {id: "6548" , name: "Comedies"},
            {id: "869" , name: "Dark Comedies"},
            {id: "4426" , name: "Foreign Comedies"},
            {id: "1402" , name: "Late Night Comedies"},
            {id: "26" , name: "Mockumentaries"},
            {id: "2700" , name: "Political Comedies"},
            {id: "9702" , name: "Screwball Comedies"},
            {id: "5286" , name: "Sports Comedies"},
            {id: "11559" , name: "Stand-up Comedy"},
            {id: "3519" , name: "Teen Comedies"},
            {id: "4922" , name: "Satires"},
            {id: "5475" , name: "Romantic Comedies"},
            {id: "10256" , name: "Slapstick Comedies"}
        ],
        [
            {id: "7627" , name: "Cult Movies"},
            {id: "8195" , name: "B-Horror Movies"},
            {id: "1252" , name: "Campy Movies"},
            {id: "10944" , name: "Cult Horror Movies"},
            {id: "4734" , name: "Cult Sci-Fi & Fantasy"},
            {id: "9434" , name: "Cult Comedies"},
        ],
        [
            {id: 6839, name: "Documentaries"},
            {id: 3652, name: "Biographical Documentaries"},
            {id: 9875, name: "Crime Documentaries"},
            {id: 5161, name: "Foreign Documentaries"},
            {id: 5349, name: "Historical Documentaries"},
            {id: 4006, name: "Military Documentaries"},
            {id: 180, name: "Sports Documentaries"},
            {id: 90361, name: "Music & Concert Documentaries"},
            {id: 1159, name: "Travel & Adventure Documentaries"},
            {id: 7018, name: "Political Documentaries"},
            {id: 10005, name: "Religious Documentaries"},
            {id: 2595, name: "Science & Nature Documentaries"},
            {id: 3675, name: "Social & Cultural Documentaries"}
        ],
        [
            {id: 5763, name: "Dramas"},
            {id: 3179, name: "Biographical Dramas"},
            {id: 29809, name: "Classic Dramas"},
            {id: 528582748, name: "Courtroom Dramas"},
            {id: 6889, name: "Crime Dramas"},
            {id: 4961, name: "Dramas based on Books"},
            {id: 3653, name: "Dramas based on real life"},
            {id: 6384, name: "Tearjerkers"},
            {id: 2150, name: "Foreign Dramas"},
            {id: 7243, name: "Sports Dramas"},
            {id: 500, name: "Gay & Lesbian Dramas"},
            {id: 384, name: "Independent Dramas"},
            {id: 9299, name: "Teen Dramas"},
            {id: 11, name: "Military Dramas"},
            {id: 12123, name: "Period Pieces"},
            {id: 6616, name: "Political Dramas"},
            {id: 1255, name: "Romantic Dramas"},
            {id: 5012, name: "Showbiz Dramas"},
            {id: 3947, name: "Social Issue Dramas"}
        ],
        [
            {id: 26835, name: "Faith & Spirituality"},
            {id: 52804, name: "Faith & Spirituality Movies"},
            {id: 2760, name: "Spiritual Documentaries"},
            {id: 751423, name: "Kids Faith & Spirituality"}
        ],
        [
            {id: 7462, name: "Foreign Movies"},
            {id: 29764, name: "Art House Movies"},
            {id: 11828, name: "Foreign Action & Adventure"},
            {id: 32473, name: "Classic Foreign Movies"},
            {id: 4426, name: "Foreign Comedies"},
            {id: 5161, name: "Foreign Documentaries"},
            {id: 2150, name: "Foreign Dramas"},
            {id: 8243, name: "Foreign Gay & Lesbian Movies"},
            {id: 8654, name: "Foreign Horror Movies"},
            {id: 6485, name: "Foreign Sci-Fi & Fantasy"},
            {id: 10306, name: "Foreign Thrillers"},
            {id: 7153, name: "Romantic Foreign Movies"},
            {id: 3761, name: "African Movies"},
            {id: 5230, name: "Australian Movies"},
            {id: 262, name: "Belgian Movies"},
            {id: 5685, name: "Korean Movies"},
            {id: 1613, name: "Latin American Movies"},
            {id: 5875, name: "Middle Eastern Movies"},
            {id: 63782, name: "New Zealand Movies"},
            {id: 11567, name: "Russian"},
            {id: 9292, name: "Scandinavian Movies"},
            {id: 9196, name: "Southeast Asian Movies"},
            {id: 58741, name: "Spanish Movies"},
            {id: 61115, name: "Greek Movies"},
            {id: 58886, name: "German Movies"},
            {id: 58807, name: "French Movies"},
            {id: 5254, name: "Eastern European Movies"},
            {id: 10606, name: "Dutch Movies"},
            {id: 58750, name: "Irish Movies"},
            {id: 10398, name: "Japanese Movies"},
            {id: 8221, name: "Italian Movies"},
            {id: 10463, name: "Indian Movies"},
            {id: 3960, name: "Chinese Movies"},
            {id: 10757, name: "British Movies"}
        ],
        [
            {id: 5977, name: "Gay & Lesbian Movies"},
            {id: 7120, name: "Gay & Lesbian Comedies"},
            {id: 500, name: "Gay & Lesbian Dramas"},
            {id: 3329, name: "Romantic Gay & Lesbian Movies"},
            {id: 8243, name: "Foreign Gay & Lesbian Movies"},
            {id: 4720, name: "Gay & Lesbian Documentaries"},
            {id: 65263, name: "Gay & Lesbian TV Shows"}
        ],
        [
            {id: 8711, name: "Horror Movies"},
            {id: 8195, name: "B-Horror Movies"},
            {id: 6895, name: "Creature Features"},
            {id: 10944, name: "Cult Horror Movies"},
            {id: 45028, name: "Deep Sea Horror Movies"},
            {id: 8654, name: "Foreign Horror Movies"},
            {id: 89585, name: "Horror Comedy"},
            {id: 947, name: "Monster Movies"},
            {id: 8646, name: "Slasher and Serial Killer Movies"},
            {id: 42023, name: "Supernatural Horror Movies"},
            {id: 52147, name: "Teen Screams"},
            {id: 75804, name: "Vampire Horror Movies"},
            {id: 75930, name: "Werewolf Horror Movies"},
            {id: 75405, name: "Zombie Horror Movies"},
            {id: 6998, name: "Satanic Stories"}
        ],
        [
            {id: 7077, name: "Independent Movies"},
            {id: 11079, name: "Experimental Movies"},
            {id: 11804, name: "Independent Action & Adventure"},
            {id: 3269, name: "Independent Thrillers"},
            {id: 9916, name: "Romantic Independent Movies"},
            {id: 4195, name: "Independent Comedies"},
            {id: 384, name: "Independent Dramas"}
        ],
        [
            {id: 1701, name: "Music"},
            {id: 52843, name: "Kids Music"},
            {id: 1105, name: "Country & Western/Folk"},
            {id: 10271, name: "Jazz & Easy Listening"},
            {id: 10741, name: "Latin Music"},
            {id: 9472, name: "Urban & Dance Concerts"},
            {id: 2856, name: "World Music Concerts"},
            {id: 3278, name: "Rock & Pop Concerts"}
        ],
        [
            {id: 13335, name: "Musicals"},
            {id: 32392, name: "Classic Musicals"},
            {id: 59433, name: "Disney Musicals"},
            {id: 13573, name: "Showbiz Musicals"},
            {id: 55774, name: "Stage Musicals"}
        ],
        [
            {id: 8883, name: "Romantic Movies"},
            {id: 502675, name: "Romantic Favorites"},
            {id: 36103, name: "Quirky Romance"},
            {id: 9916, name: "Romantic Independent Movies"},
            {id: 7153, name: "Romantic Foreign Movies"},
            {id: 1255, name: "Romantic Dramas"},
            {id: 35800, name: "Steamy Romantic Movies"},
            {id: 31273, name: "Classic Romantic Movies"},
            {id: 5475, name: "Romantic Comedies"}
        ],
        [
            {id: 1492, name: "Sci-Fi & Fantasy"},
            {id: 1568, name: "Action Sci-Fi & Fantasy"},
            {id: 3327, name: "Alien Sci-Fi"},
            {id: 47147, name: "Classic Sci-Fi & Fantasy"},
            {id: 4734, name: "Cult Sci-Fi & Fantasy"},
            {id: 9744, name: "Fantasy Movies"},
            {id: 6926, name: "Sci-Fi Adventure"},
            {id: 3916, name: "Sci-Fi Dramas"},
            {id: 1694, name: "Sci-Fi Horror Movies"},
            {id: 11014, name: "Sci-Fi Thrillers"},
            {id: 6485, name: "Foreign Sci-Fi & Fantasy"}
        ],
        [
            {id: 4370, name: "Sports Movies"},
            {id: 5286, name: "Sports Comedies"},
            {id: 180, name: "Sports Documentaries"},
            {id: 7243, name: "Sports Dramas"},
            {id: 12339, name: "Baseball Movies"},
            {id: 12803, name: "Football Movies"},
            {id: 12443, name: "Boxing Movies"},
            {id: 12549, name: "Soccer Movies"},
            {id: 6695, name: "Martial Arts, Boxing & Wrestling"},
            {id: 12762, name: "Basketball Movies"},
            {id: 9327, name: "Sports & Fitness"}
        ],
        [
            {id: 8933, name: "Thrillers"},
            {id: 43048, name: "Action Thrillers"},
            {id: 46588, name: "Classic Thrillers"},
            {id: 10499, name: "Crime Thrillers"},
            {id: 10306, name: "Foreign Thrillers"},
            {id: 3269, name: "Independent Thrillers"},
            {id: 31851, name: "Gangster Movies"},
            {id: 5505, name: "Psychological Thrillers"},
            {id: 10504, name: "Political Thrillers"},
            {id: 9994, name: "Mysteries"},
            {id: 11014, name: "Sci-Fi Thrillers"},
            {id: 9147, name: "Spy Thrillers"},
            {id: 972, name: "Steamy Thrillers"},
            {id: 11140, name: "Supernatural Thrillers"}
        ]
    ];

    class Utils {

        static sleep(millis) {
            var startTime = new Date().getTime();
            while (true) {
                if (new Date().getTime() - startTime > millis) {
                    return;
                }
            }
        }

    }

    class HiddenCategoryNode {
        constructor(name, id) {
            this.name = name;
            this.id = id;
        }
        getNode() {
            throw new Error("This method must be implemented");
        }
    }

    class ParentHiddenCategoryNode extends HiddenCategoryNode {

        getNode() {

            var li = document.createElement("li");
            li.className = "member-footer-link-wrapper";
            li.style = "font-size: 16px; padding-top: 14px;";

            var dummyParentHiddenCategoryNode = li.cloneNode();

            var a = document.createElement("a");
            a.className = "member-footer-link";
            a.href = CATEGORY_PATH + this.id;
            li.appendChild(a);

            var span = document.createElement("span");
            span.className = "member-footer-link-content";
            span.innerHTML = this.name;
            a.appendChild(span);

            var parentCategoryFragment = document.createDocumentFragment();
            parentCategoryFragment.appendChild(li);
            parentCategoryFragment.appendChild(dummyParentHiddenCategoryNode.cloneNode());
            parentCategoryFragment.appendChild(dummyParentHiddenCategoryNode.cloneNode());
            parentCategoryFragment.appendChild(dummyParentHiddenCategoryNode.cloneNode());

            return parentCategoryFragment;

        }

    }

    class ChildHiddenCategoryNode extends HiddenCategoryNode {

        getNode() {

            var li = document.createElement("li");
            li.className = "member-footer-link-wrapper";

            var a = document.createElement("a");
            a.className = "member-footer-link";
            a.href = CATEGORY_PATH + this.id;
            li.appendChild(a);

            var span = document.createElement("span");
            span.className = "member-footer-link-content";
            span.innerHTML = this.name;
            a.appendChild(span);

            return li;

        }

    }

    class HiddenCategoriesNode {

        getNode() {

            var ul = document.createElement("ul");
            ul.className = "member-footer-links";
            ul.style = "padding-bottom: 50px;";
            ul.id = this.getId();

            var hiddenCategoryGroup;
            for (hiddenCategoryGroup of HIDDEN_CATEGORIES) {

                var hiddenCategoryGroupIterator = hiddenCategoryGroup.values();

                var parentHiddenCategory = hiddenCategoryGroupIterator.next().value;
                var parentHiddenCategoryName = parentHiddenCategory.name;
                var parentHiddenCategoryId = parentHiddenCategory.id;
                ul.appendChild(new ParentHiddenCategoryNode(parentHiddenCategoryName, parentHiddenCategoryId).getNode());

                var childHiddenCategory;
                for (childHiddenCategory of hiddenCategoryGroupIterator) {
                    var childHiddenCategoryName = childHiddenCategory.name;
                    var childHiddenCategoryId = childHiddenCategory.id;
                    ul.appendChild(new ChildHiddenCategoryNode(childHiddenCategoryName, childHiddenCategoryId).getNode());
                }

                var nChildHiddenCategories = hiddenCategoryGroup.length - 1;
                var nDummyChildHiddenCategories = 4 * Math.ceil(nChildHiddenCategories / 4) - nChildHiddenCategories;
                var i;
                for (i = 0; i < nDummyChildHiddenCategories; i++) {
                    var dummyChildHiddenCategoryNode = new ChildHiddenCategoryNode("", "").getNode();
                    ul.appendChild(dummyChildHiddenCategoryNode);
                }

            }

            return ul;

        }

        getId() {
            return "netflix-hidden-categories";
        }

    }

    function scrollTo(htmlElement) {
        var offsetFromTop = 50;
        var durationInMs = 1000;
        $("html, body").animate({ scrollTop: $("#" + htmlElement.id).offset().top - offsetFromTop }, durationInMs);
    }

    class MoreLinkNode {

        getNode(hiddenCategoriesNode) {

            var li = document.createElement("li");
            li.className = "navigation-tab";

            var a = document.createElement("a");
            a.innerHTML = "More";
            a.onclick = function () {
                var hiddenCategoriesHtmlElement = document.querySelector("#" + hiddenCategoriesNode.getId());
                if (hiddenCategoriesHtmlElement)
                    scrollTo(hiddenCategoriesHtmlElement);
            };
            li.appendChild(a);

            return li;

        }

    }

    class HiddenCategoriesBuilder {

        constructor() {
            this.hiddenCategoriesNode = new HiddenCategoriesNode();
            this.moreLinkNode = new MoreLinkNode();
        }

        getHiddenCategoriesNodeDestination() {
            return document.querySelector("div.member-footer");
        }

        getMoreLinkNodeDestination() {
            return document.querySelector("ul.tabbed-primary-navigation");
        }

        addHiddenCategories() {
            var hiddenCategoriesNodeDestination = this.getHiddenCategoriesNodeDestination();
            if (hiddenCategoriesNodeDestination)
                hiddenCategoriesNodeDestination.insertBefore(this.hiddenCategoriesNode.getNode(), hiddenCategoriesNodeDestination.firstChild);
        }

        addMoreLink() {
            var moreLinkNodeDestination = this.getMoreLinkNodeDestination();
            if (moreLinkNodeDestination)
                moreLinkNodeDestination.appendChild(this.moreLinkNode.getNode(this.hiddenCategoriesNode));
        }

    }

    var netflixHiddenCategories = new HiddenCategoriesBuilder();
    netflixHiddenCategories.addMoreLink();
    netflixHiddenCategories.addHiddenCategories();

})();
