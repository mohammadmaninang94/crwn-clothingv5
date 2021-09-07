import { philData, address } from 'addresspinas';

export const GetDropdownData = (selectedRegion, selectedProvince, selectedCityMun, selectedBrgy) => {
    let dropDownObj = {}

    // populate Regions
    const { regions } = philData.allRegions;
    dropDownObj.regions = regions;

    // populate Provinces
    if (selectedRegion) {
        const region = regions.find(({ name }) => name === selectedRegion);
        if (region) {
            const { provinces } = address.getProvinceOfRegion(region.reg_code);
            dropDownObj.provinces = provinces;

            // populate City or Municipalitites
            if (selectedProvince) {
                const province = provinces.find(({ name }) => name === selectedProvince);
                if (province) {
                    const { cityAndMun } = address.getCityMunOfProvince(province.prov_code);
                    dropDownObj.cityAndMun = cityAndMun;

                    // populate Barangays
                    if (selectedCityMun) {
                        const cityOrMun = cityAndMun.find(({ name }) => name === selectedCityMun);
                        if (cityOrMun) {
                            const { barangays } = address.getBarangaysOfCityMun(cityOrMun.mun_code);
                            dropDownObj.barangays = barangays;

                            // populate Barangays
                            if (selectedBrgy) {
                                const barangay = barangays.find(({ name }) => name === selectedBrgy);
                                if (barangay) {
                                    const zipCodes = address.getZipcode({ name: '', mun_code: barangay.mun_code });
                                    dropDownObj.zipCodes = zipCodes;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return dropDownObj;
};

export const GetDropdownDataByCode = (name, code) => {
    switch (name) {
        case 'region':
            const { provinces } = address.getProvinceOfRegion(code);
            return {
                provinces: provinces,
                cityAndMun: [], barangays: [], zipCodes: []
            };
        case 'province':
            const { cityAndMun } = address.getCityMunOfProvince(code);
            return {
                cityAndMun: cityAndMun,
                barangays: [], zipCodes: []
            };
        case 'cityMun':
            const { barangays } = address.getBarangaysOfCityMun(code);
            return {
                barangays: barangays,
                zipCodes: []
            };
        case 'barangay':
            const zipCodes = address.getZipcode({ name: '', mun_code: code });
            return { zipCodes: zipCodes };
        default:
            return {};
    }
};