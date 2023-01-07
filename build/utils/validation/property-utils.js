"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBoolean = exports.createPropertyDecorator = void 0;
const class_transformer_1 = require("class-transformer");
const lodash_1 = require("lodash");
const swagger_1 = require("../swagger");
const validate_utils_1 = require("./validate-utils");
function createPropertyDecorator(metakey, metadata, overrideExisting = true, typeOptions = {}, validation) {
    return (target, propertyKey) => {
        var _a, _b, _c, _d;
        const properties = Reflect.getMetadata(swagger_1.DECORATORS.API_MODEL_PROPERTIES_ARRAY, target) || [];
        const key = `:${propertyKey}`;
        if (!properties.includes(key)) {
            Reflect.defineMetadata(swagger_1.DECORATORS.API_MODEL_PROPERTIES_ARRAY, [...properties, `:${propertyKey}`], target);
        }
        const existingMetadata = Reflect.getMetadata(metakey, target, propertyKey);
        if (existingMetadata) {
            const newMetadata = (0, lodash_1.pickBy)(metadata, (0, lodash_1.negate)(lodash_1.isUndefined));
            const metadataToSave = overrideExisting
                ? Object.assign(Object.assign({}, existingMetadata), newMetadata) : Object.assign(Object.assign({}, newMetadata), existingMetadata);
            Reflect.defineMetadata(metakey, metadataToSave, target, propertyKey);
        }
        else {
            const type = (_d = (_c = (_b = (_a = target === null || target === void 0 ? void 0 : target.constructor) === null || _a === void 0 ? void 0 : _a[swagger_1.METADATA_FACTORY_NAME]) === null || _b === void 0 ? void 0 : _b.call(_a)[propertyKey]) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : Reflect.getMetadata('design:type', target, propertyKey);
            Reflect.defineMetadata(metakey, Object.assign({ type }, (0, lodash_1.pickBy)(metadata, (0, lodash_1.negate)(lodash_1.isUndefined))), target, propertyKey);
        }
        return (0, validate_utils_1.Validate)({ apiProperty: metadata, validation, typeOptions })(target, propertyKey);
    };
}
exports.createPropertyDecorator = createPropertyDecorator;
const ToBoolean = () => {
    const toPlain = (0, class_transformer_1.Transform)(({ value }) => {
        return value;
    }, {
        toPlainOnly: true,
    });
    const toClass = (target, key) => {
        return (0, class_transformer_1.Transform)(({ obj }) => {
            return valueToBoolean(obj[key]);
        }, {
            toClassOnly: true,
        })(target, key);
    };
    return function (target, key) {
        toPlain(target, key);
        toClass(target, key);
    };
};
exports.ToBoolean = ToBoolean;
const valueToBoolean = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === 'boolean') {
        return value;
    }
    if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
        return true;
    }
    if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
        return false;
    }
    return value;
};
//# sourceMappingURL=property-utils.js.map