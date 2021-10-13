
export default async (req, res) => {
    try {
        res.status(200).json(
            [{ano: 1550, quantidade: 15000},
            {ano: 1576, quantidade: 17100},
            {ano: 1583, quantidade: 57000},
            {ano: 1660, quantidade: 184000},
            {ano: 1690, quantidade: 242000},
            {ano: 1700, quantidade: 300000},
            {ano: 1800, quantidade: 3250000},
            {ano: 1808, quantidade: 4051000},
            {ano: 1810, quantidade: 4155000},
            {ano: 1815, quantidade: 4427000},
            {ano: 1823, quantidade: 5025000},
            {ano: 1850, quantidade: 8000000},
            {ano: 1869, quantidade: 9686000},
            {ano: 1872, quantidade: 10112061},
            {ano: 1890, quantidade: 14333915},
            {ano: 1900, quantidade: 17438434},
            {ano: 1920, quantidade: 30635605},
            {ano: 1940, quantidade: 41236315},
            {ano: 1950, quantidade: 51944397},
            {ano: 1960, quantidade: 72179235},
            {ano: 1961, quantidade: 74311338},
            {ano: 1962, quantidade: 76514329},
            {ano: 1963, quantidade: 78772647},
            {ano: 1964, quantidade: 81064572},
            {ano: 1965, quantidade: 83373533},
            {ano: 1966, quantidade: 85696502},
            {ano: 1967, quantidade: 88035815},
            {ano: 1968, quantidade: 90387079},
            {ano: 1969, quantidade: 92746607},
            {ano: 1970, quantidade: 95113265},
            {ano: 1971, quantidade: 97482928},
            {ano: 1972, quantidade: 99859388},
            {ano: 1973, quantidade: 102259497},
            {ano: 1974, quantidade: 104706193},
            {ano: 1975, quantidade: 107216209},
            {ano: 1976, quantidade: 109790943},
            {ano: 1977, quantidade: 112425392},
            {ano: 1978, quantidade: 115121158},
            {ano: 1979, quantidade: 117878412},
            {ano: 1980, quantidade: 120694012},
            {ano: 1981, quantidade: 123570327},
            {ano: 1982, quantidade: 126498322},
            {ano: 1983, quantidade: 129448815},
            {ano: 1984, quantidade: 132383569},
            {ano: 1985, quantidade: 135274083},
            {ano: 1986, quantidade: 138108915},
            {ano: 1987, quantidade: 140891606},
            {ano: 1988, quantidade: 143627505},
            {ano: 1989, quantidade: 146328305},
            {ano: 1990, quantidade: 149003225},
            {ano: 1991, quantidade: 151648007},
            {ano: 1992, quantidade: 154259382},
            {ano: 1993, quantidade: 156849086},
            {ano: 1994, quantidade: 159432717},
            {ano: 1995, quantidade: 162019889},
            {ano: 1996, quantidade: 164614682},
            {ano: 1997, quantidade: 167209046},
            {ano: 1998, quantidade: 169785253},
            {ano: 1999, quantidade: 172318674},
            {ano: 2000, quantidade: 174790339},
            {ano: 2001, quantidade: 177196051},
            {ano: 2002, quantidade: 179537523},
            {ano: 2003, quantidade: 181809244},
            {ano: 2004, quantidade: 184006479},
            {ano: 2005, quantidade: 186127108},
            {ano: 2006, quantidade: 188167353},
            {ano: 2007, quantidade: 190130445},
            {ano: 2008, quantidade: 192030362},
            {ano: 2009, quantidade: 193886505},
            {ano: 2010, quantidade: 195713637},
            {ano: 2011, quantidade: 197514541},
            {ano: 2012, quantidade: 199287292},
            {ano: 2013, quantidade: 201035904},
            {ano: 2014, quantidade: 202763744},
            {ano: 2015, quantidade: 204471759},
            {ano: 2016, quantidade: 206163056},
            {ano: 2017, quantidade: 207833825},
            {ano: 2018, quantidade: 209469320},
            {ano: 2019, quantidade: 211049519},
            {ano: 2020, quantidade: 212559409}]
        )
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
};
