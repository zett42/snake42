/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(44);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2011 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(46));
	__export(__webpack_require__(47));
	__export(__webpack_require__(20));
	__export(__webpack_require__(4));
	__export(__webpack_require__(21));
	__export(__webpack_require__(5));
	__export(__webpack_require__(48));
	__export(__webpack_require__(49));
	__export(__webpack_require__(50));
	__export(__webpack_require__(51));
	__export(__webpack_require__(12));
	__export(__webpack_require__(52));
	__export(__webpack_require__(53));
	__export(__webpack_require__(13));
	__export(__webpack_require__(55));
	__export(__webpack_require__(22));
	//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	class PositionComponent extends typed_ecstasy_1.Component {
	    constructor() {
	        super(...arguments);
	        this.x = 0;
	        this.y = 0;
	    }
	}
	exports.PositionComponent = PositionComponent;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	//--------------------------------------------------------------------------------------------------------
	/**
	 * Component that defines an entity as the snake head. It links to the snake tail.
	 */
	class SnakeHeadComponent extends typed_ecstasy_1.Component {
	    constructor(tailId = 0, isAlive = true, length = 0) {
	        super();
	        this.tailId = tailId;
	        this.isAlive = isAlive;
	        this.length = length;
	    }
	}
	exports.SnakeHeadComponent = SnakeHeadComponent;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Base class for all systems. An EntitySystem is intended to process entities.
	 */
	var EntitySystem = /** @class */ (function () {
	    /**
	     * @param priority The priority to execute this system with (lower means higher priority).
	     */
	    function EntitySystem(priority) {
	        if (priority === void 0) { priority = 0; }
	        this.processing = true;
	        this.engine = null;
	        this.priority = priority;
	    }
	    /** @return Whether or not the system should be processed. */
	    EntitySystem.prototype.checkProcessing = function () {
	        return this.processing;
	    };
	    /**
	     * Sets whether or not the system should be processed by the Engine.
	     *
	     * @param processing true to enable, false to disable processing
	     */
	    EntitySystem.prototype.setProcessing = function (processing) {
	        this.processing = processing;
	    };
	    /** @return The priority of the system */
	    EntitySystem.prototype.getPriority = function () {
	        return this.priority;
	    };
	    /**
	     * Use this to set the priority of the system. Lower means it'll get executed first.
	     *
	     * @param priority the new priority
	     */
	    EntitySystem.prototype.setPriority = function (priority) {
	        this.priority = priority;
	        if (this.engine)
	            this.engine.sortSystems();
	    };
	    /** @return The engine */
	    EntitySystem.prototype.getEngine = function () { return this.engine; };
	    /**
	     * Called when this EntitySystem is added to an Engine.
	     *
	     * @param engine The Engine this system was added to.
	     */
	    EntitySystem.prototype.addedToEngine = function (engine) {
	        this.engine = engine;
	    };
	    /**
	     * Called when this EntitySystem is removed from an Engine.
	     *
	     * @param engine The Engine the system was removed from.
	     */
	    EntitySystem.prototype.removedFromEngine = function (engine) {
	        this.engine = null;
	    };
	    return EntitySystem;
	}());
	exports.EntitySystem = EntitySystem;
	//# sourceMappingURL=EntitySystem.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2014 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	var Constructor_1 = __webpack_require__(13);
	var classCounters = {};
	/**
	 * Uniquely identifies a sub-class. It assigns them an index which is used internally for fast comparison and
	 * retrieval. UniqueType is a package protected class. You cannot instantiate a UniqueType.
	 * They can only be accessed via {@link #getIndexForClass(clazz)}. Each class will always
	 * return the same instance of UniqueType.
	 */
	var UniqueType = /** @class */ (function () {
	    function UniqueType(index, group) {
	        this.index = index;
	        this.group = group;
	    }
	    /** @return This UniqueType's group */
	    UniqueType.prototype.getGroup = function () {
	        return this.group;
	    };
	    /** @return This UniqueType's unique index */
	    UniqueType.prototype.getIndex = function () {
	        return this.index;
	    };
	    /**
	     * @param clazz The class constructor
	     * @return A UniqueType matching the Class
	     */
	    UniqueType.getForInstance = function (inst) {
	        return UniqueType.getForClass(Constructor_1.Constructor.getFor(inst));
	    };
	    /**
	     * @param clazz The class constructor
	     * @return A UniqueType matching the Class
	     */
	    UniqueType.generateFor = function (clazz) {
	        var baseClassName = Constructor_1.Constructor.getBaseClass(clazz).name;
	        if (!baseClassName)
	            throw "Could not get base class for " + clazz.toString();
	        if (!classCounters.hasOwnProperty(baseClassName))
	            classCounters[baseClassName] = 0;
	        var index = classCounters[baseClassName]++;
	        return clazz.__uniqueType = new UniqueType(index, baseClassName);
	    };
	    /**
	     * @param clazz The class constructor
	     * @return A UniqueType matching the Class
	     */
	    UniqueType.getForClass = function (clazz) {
	        return clazz && (clazz.__uniqueType || UniqueType.generateFor(clazz));
	    };
	    /**
	     * @param clazzes list of class constructors
	     * @return Bits representing the collection of classes for quick comparison and matching.
	     */
	    UniqueType.getBitsForClasses = function (destination) {
	        var clazzes = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            clazzes[_i - 1] = arguments[_i];
	        }
	        for (var _a = 0, clazzes_1 = clazzes; _a < clazzes_1.length; _a++) {
	            var clazz = clazzes_1[_a];
	            destination.set(UniqueType.getForClass(clazz).getIndex());
	        }
	        return destination;
	    };
	    /** @return a hashcode to identify this type */
	    UniqueType.prototype.hashCode = function () {
	        return this.group + this.index;
	    };
	    /**
	     * Compare with another type.
	     *
	     * @param other the other type
	     * @return true if the types are equal.
	     */
	    UniqueType.prototype.equals = function (other) {
	        if (this === other)
	            return true;
	        if (this.group !== other.group)
	            return false;
	        return this.index === other.index;
	    };
	    return UniqueType;
	}());
	exports.UniqueType = UniqueType;
	//# sourceMappingURL=UniqueType.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const PositionComponent_1 = __webpack_require__(2);
	function setEntityPosition(playField, entity, pos) {
	    pos = { x: Math.trunc(pos.x), y: Math.trunc(pos.y) };
	    const posComponent = entity.get(PositionComponent_1.PositionComponent);
	    if (!posComponent) {
	        throw new Error("Entity cannot be inserted in playfield because it does not contain PositionComponent");
	    }
	    // Remove entity from current cell (if any)
	    playField.removeEntity(posComponent, entity.getId());
	    // Insert entity in new cell
	    playField.insertEntity(pos, entity.getId());
	    // Update entity position
	    posComponent.x = pos.x;
	    posComponent.y = pos.y;
	}
	exports.setEntityPosition = setEntityPosition;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	var Direction;
	(function (Direction) {
	    Direction[Direction["none"] = 0] = "none";
	    Direction[Direction["right"] = 1] = "right";
	    Direction[Direction["left"] = 2] = "left";
	    Direction[Direction["up"] = 3] = "up";
	    Direction[Direction["down"] = 4] = "down";
	})(Direction = exports.Direction || (exports.Direction = {}));
	class DirectionComponent extends typed_ecstasy_1.Component {
	    constructor(value = Direction.none) {
	        super();
	        this.value = value;
	    }
	}
	exports.DirectionComponent = DirectionComponent;
	class RequestedDirectionComponent extends typed_ecstasy_1.Component {
	    constructor(value = Direction.none) {
	        super();
	        this.value = value;
	    }
	}
	exports.RequestedDirectionComponent = RequestedDirectionComponent;
	function directionToVec2(dir) {
	    let result = { x: 0, y: 0 };
	    switch (dir) {
	        case Direction.right:
	            result.x = 1;
	            break;
	        case Direction.left:
	            result.x = -1;
	            break;
	        case Direction.down:
	            result.y = 1;
	            break;
	        case Direction.up:
	            result.y = -1;
	            break;
	    }
	    return result;
	}
	exports.directionToVec2 = directionToVec2;
	function randomDirection() {
	    return Math.trunc(1 + Math.random() * 4);
	}
	exports.randomDirection = randomDirection;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	//--------------------------------------------------------------------------------------------------------
	/**
	 * Component that defines connection between snake segments.
	 */
	class DoubleLinkComponent extends typed_ecstasy_1.Component {
	    constructor(prevId = null, // previous entity (towards tail)
	    nextId = null // next entity (towards head)
	    ) {
	        super();
	        this.prevId = prevId;
	        this.nextId = nextId;
	    }
	}
	exports.DoubleLinkComponent = DoubleLinkComponent;
	//--------------------------------------------------------------------------------------------------------
	/**
	 * Append entity to list.
	 */
	function appendEntityToDoubleLinkedList(current, toAppend) {
	    const currentLink = current.get(DoubleLinkComponent);
	    const toAppendLink = toAppend.get(DoubleLinkComponent);
	    currentLink.nextId = toAppend.getId();
	    toAppendLink.prevId = current.getId();
	}
	exports.appendEntityToDoubleLinkedList = appendEntityToDoubleLinkedList;
	//--------------------------------------------------------------------------------------------------------
	/**
	 * Insert entity before given entity.
	 */
	function insertEntityInDoubleLinkedList(ecs, toInsert, insertBefore) {
	    const toInsertLink = toInsert.get(DoubleLinkComponent);
	    const insertBeforeLink = insertBefore.get(DoubleLinkComponent);
	    if (insertBeforeLink.prevId) {
	        const insertAfter = ecs.getEntity(insertBeforeLink.prevId);
	        const insertAfterLink = insertAfter.get(DoubleLinkComponent);
	        insertAfterLink.nextId = toInsert.getId();
	        toInsertLink.prevId = insertAfter.getId();
	    }
	    insertBeforeLink.prevId = toInsert.getId();
	    toInsertLink.nextId = insertBefore.getId();
	}
	exports.insertEntityInDoubleLinkedList = insertEntityInDoubleLinkedList;
	//--------------------------------------------------------------------------------------------------------
	/**
	 * Remove last entity from list and return new last entity.
	 */
	function removeLastEntityFromDoubleLinkedList(ecs, lastEntity) {
	    const lastEntityLink = lastEntity.get(DoubleLinkComponent);
	    if (lastEntityLink.nextId) {
	        const newLastEntity = ecs.getEntity(lastEntityLink.nextId);
	        const newLastEntityLink = newLastEntity.get(DoubleLinkComponent);
	        newLastEntityLink.prevId = null;
	        lastEntityLink.nextId = null;
	        return newLastEntity;
	    }
	    return null;
	}
	exports.removeLastEntityFromDoubleLinkedList = removeLastEntityFromDoubleLinkedList;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	/**
	 * Component for actors that can eat something. The stomach member defines how much the actor has eaten, but not digested yet.
	 */
	class FeedableComponent extends typed_ecstasy_1.Component {
	    constructor(stomach = 0) {
	        super();
	        this.stomach = stomach;
	    }
	}
	exports.FeedableComponent = FeedableComponent;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	// Nutrition value of snake food. Positive value makes snake grow, negative value shortens it.
	class NutritionComponent extends typed_ecstasy_1.Component {
	    constructor(value = 1) {
	        super();
	        this.value = value;
	    }
	}
	exports.NutritionComponent = NutritionComponent;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	class ObstacleComponent extends typed_ecstasy_1.Component {
	}
	exports.ObstacleComponent = ObstacleComponent;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2011 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 *  A bitset, without size limitation, allows comparison via bitwise operators to other bitfields.
	 */
	var Bits = /** @class */ (function () {
	    /**
	     * Creates a bit set whose initial size is large enough to explicitly represent bits with indices in the range 0 through nbits-1.
	     *
	     * @param nbits the initial size of the bit set
	     */
	    function Bits(nbits) {
	        if (nbits === void 0) { nbits = 64; }
	        this.data = new Int32Array(Math.max(2, Math.ceil(nbits / 32)));
	    }
	    /**
	     * @param index the index of the bit
	     * @return Whether the bit is set
	     */
	    Bits.prototype.get = function (index) {
	        var word = index >> 5;
	        if (word >= this.data.length)
	            return false;
	        return (this.data[word] & (1 << (index & 0x1F))) !== 0;
	    };
	    /**
	     * Returns the bit at the given index and clears it in one go.
	     *
	     * @param index the index of the bit
	     * @return Whether the bit was set before invocation
	     */
	    Bits.prototype.getAndClear = function (index) {
	        var word = index >> 5;
	        if (word >= this.data.length)
	            return false;
	        var oldData = this.data[word];
	        this.data[word] &= ~(1 << (index & 0x1F));
	        return this.data[word] !== oldData;
	    };
	    /**
	     * Returns the bit at the given index and sets it in one go.
	     *
	     * @param index the index of the bit
	     * @return Whether the bit was set before invocation
	     */
	    Bits.prototype.getAndSet = function (index) {
	        var word = index >> 5;
	        this.checkCapacity(word);
	        var oldData = this.data[word];
	        this.data[word] |= 1 << (index & 0x1F);
	        return this.data[word] === oldData;
	    };
	    /** @param index the index of the bit to set */
	    Bits.prototype.set = function (index) {
	        var word = index >> 5;
	        this.checkCapacity(word);
	        this.data[word] |= 1 << (index & 0x1F);
	    };
	    /** Sets the entire bitset */
	    Bits.prototype.setAll = function () {
	        this.data.fill(-1);
	    };
	    /** @param index the index of the bit to flip */
	    Bits.prototype.flip = function (index) {
	        var word = index >> 5;
	        this.checkCapacity(word);
	        this.data[word] ^= 1 << (index & 0x1F);
	    };
	    Bits.prototype.checkCapacity = function (len) {
	        if (len >= this.data.length) {
	            var data = new Int32Array(len + 1);
	            data.set(this.data);
	            this.data = data;
	        }
	    };
	    /** @param index the index of the bit to clear */
	    Bits.prototype.clear = function (index) {
	        var word = index >> 5;
	        if (word >= this.data.length)
	            return;
	        this.data[word] &= ~(1 << (index & 0x1F));
	    };
	    /** Clears the entire bitset */
	    Bits.prototype.clearAll = function () {
	        this.data.fill(0);
	    };
	    /** @return The number of bits currently stored, **not** the highset set bit! */
	    Bits.prototype.numBits = function () {
	        return this.data.length << 5;
	    };
	    /** @return The minimal number of words to store all the bits */
	    Bits.prototype.usedWords = function () {
	        for (var word = this.data.length - 1; word >= 0; --word) {
	            var dataAtWord = this.data[word];
	            if (dataAtWord !== 0)
	                return word + 1;
	        }
	        return 0;
	    };
	    /**
	     * Returns the "logical size" of this bitset: The index of the highest set bit in the bitset plus one.
	     * Returns zero if the bitset contains no set bits.
	     *
	     * @return The logical size of this bitset
	     */
	    Bits.prototype.length = function () {
	        for (var word = this.data.length - 1; word >= 0; --word) {
	            var dataAtWord = this.data[word];
	            if (dataAtWord !== 0) {
	                for (var bit = 31; bit >= 0; --bit) {
	                    if ((dataAtWord & (1 << (bit & 0x1F))) !== 0) {
	                        return (word << 5) + bit + 1;
	                    }
	                }
	            }
	        }
	        return 0;
	    };
	    /** @return true if this bitset contains no bits that are set to true */
	    Bits.prototype.isEmpty = function () {
	        var length = this.data.length;
	        for (var i = 0; i < length; i++) {
	            if (this.data[i] !== 0) {
	                return false;
	            }
	        }
	        return true;
	    };
	    /**
	     * Returns the index of the first bit that is set to true that occurs on or after the specified starting index.
	     *
	     * @param fromIndex the index to start looking
	     * @return *>= 0* if a truthy bit was found, *-1* otherwise.
	     */
	    Bits.prototype.nextSetBit = function (fromIndex) {
	        var word = fromIndex >> 5;
	        if (word >= this.data.length)
	            return -1;
	        var dataAtWord = this.data[word];
	        if (dataAtWord !== 0) {
	            for (var i = fromIndex & 0x1f; i < 32; i++) {
	                if ((dataAtWord & (1 << (i & 0x1F))) !== 0) {
	                    return (word << 5) + i;
	                }
	            }
	        }
	        for (word++; word < this.data.length; word++) {
	            dataAtWord = this.data[word];
	            if (dataAtWord !== 0) {
	                for (var i = 0; i < 32; i++) {
	                    if ((dataAtWord & (1 << (i & 0x1F))) !== 0) {
	                        return (word << 5) + i;
	                    }
	                }
	            }
	        }
	        return -1;
	    };
	    /**
	     * Returns the index of the first bit that is set to false that occurs on or after the specified starting index.
	     *
	     * @param fromIndex the index to start looking
	     * @return *>= 0* if a falsy bit was found, *-1* otherwise.
	     */
	    Bits.prototype.nextClearBit = function (fromIndex) {
	        var word = fromIndex >> 5;
	        if (word >= this.data.length)
	            return this.data.length << 5;
	        var dataAtWord = this.data[word];
	        for (var i = fromIndex & 0x1f; i < 32; i++) {
	            if ((dataAtWord & (1 << (i & 0x1F))) === 0) {
	                return (word << 5) + i;
	            }
	        }
	        for (word++; word < this.data.length; word++) {
	            dataAtWord = this.data[word];
	            for (var i = 0; i < 32; i++) {
	                if ((dataAtWord & (1 << (i & 0x1F))) === 0) {
	                    return (word << 5) + i;
	                }
	            }
	        }
	        return this.data.length << 5;
	    };
	    /**
	     * Performs a logical **AND** of this target bit set with the argument bit set. This bit set is modified so
	     * that each bit in  it has the value true if and only if it both initially had the value true and the
	     * corresponding bit in the bit set argument also had the value true.
	     *
	     * @param other The other instance
	     * @return this
	     */
	    Bits.prototype.and = function (other) {
	        var commonWords = Math.min(this.data.length, other.data.length);
	        for (var i = 0; commonWords > i; i++) {
	            this.data[i] &= other.data[i];
	        }
	        if (this.data.length > commonWords) {
	            for (var i = commonWords, s = this.data.length; s > i; i++) {
	                this.data[i] = 0;
	            }
	        }
	        return this;
	    };
	    /**
	     * Clears all of the bits in this instance whose corresponding bit is set in the other instance.
	     *
	     * @param other The other instance
	     */
	    Bits.prototype.andNot = function (other) {
	        for (var i = 0, j = this.data.length, k = other.data.length; i < j && i < k; i++) {
	            this.data[i] &= ~other.data[i];
	        }
	        return this;
	    };
	    /**
	     * Performs a logical **OR** of this instance with the other instance. This instance is modified so that a
	     * bit in it has the value true if and only if it either already had the value true or the corresponding bit in
	     * the other instance has the value true.
	     *
	     * @param other a bit set
	     * @return this
	     */
	    Bits.prototype.or = function (other) {
	        var commonWords = Math.min(this.data.length, other.data.length);
	        for (var i = 0; commonWords > i; i++) {
	            this.data[i] |= other.data[i];
	        }
	        if (commonWords < other.data.length) {
	            this.checkCapacity(other.data.length);
	            for (var i = commonWords, s = other.data.length; s > i; i++) {
	                this.data[i] = other.data[i];
	            }
	        }
	        return this;
	    };
	    /**
	     * Performs a logical **XOR** of this bit set with the bit set argument. This bit set is modified so that a
	     * bit in it has the value true if and only if one of the following statements holds:
	     *
	     * - The bit initially has the value true, and the corresponding bit in the argument has the value false.
	     * - The bit initially has the value false, and the corresponding bit in the argument has the value true.
	     *
	     * @param other The other instance
	     * @return this
	     */
	    Bits.prototype.xor = function (other) {
	        var commonWords = Math.min(this.data.length, other.data.length);
	        for (var i = 0; commonWords > i; i++) {
	            this.data[i] ^= other.data[i];
	        }
	        if (commonWords < other.data.length) {
	            this.checkCapacity(other.data.length);
	            for (var i = commonWords, s = other.data.length; s > i; i++) {
	                this.data[i] = other.data[i];
	            }
	        }
	        return this;
	    };
	    /**
	     * Returns true if the other instance has any bits set to true that are also set to true in this instance.
	     *
	     * @param other The other instance
	     * @return true if this bit set intersects the specified bit set
	     */
	    Bits.prototype.intersects = function (other) {
	        for (var i = Math.min(this.data.length, other.data.length) - 1; i >= 0; i--) {
	            if ((this.data[i] & other.data[i]) !== 0) {
	                return true;
	            }
	        }
	        return false;
	    };
	    /**
	     * Returns true if this instance is a super set of the other instance, i.e. it has all bits set to true that are
	     *  also set to true in the other instance.
	     *
	     * @param other The other instance
	     * @return true if this bit set is a super set of the specified set
	     */
	    Bits.prototype.containsAll = function (other) {
	        for (var i = this.data.length; i < other.data.length; i++) {
	            if (other.data[i] !== 0) {
	                return false;
	            }
	        }
	        for (var i = Math.min(this.data.length, other.data.length) - 1; i >= 0; i--) {
	            if ((this.data[i] & other.data[i]) !== other.data[i]) {
	                return false;
	            }
	        }
	        return true;
	    };
	    /** @return All numbers as string, comma separated */
	    Bits.prototype.getStringId = function () {
	        return this.data.slice(0, this.usedWords()).join(',');
	    };
	    /**
	     * Compare with another set of bits.
	     *
	     * @param other the bits to compare with
	     * @return true if all bits match
	     */
	    Bits.prototype.equals = function (other) {
	        if (this === other)
	            return true;
	        var commonWords = Math.min(this.data.length, other.data.length);
	        for (var i = 0; commonWords > i; i++) {
	            if (this.data[i] !== other.data[i])
	                return false;
	        }
	        if (this.data.length === other.data.length)
	            return true;
	        return this.length() === other.length();
	    };
	    return Bits;
	}());
	exports.Bits = Bits;
	//# sourceMappingURL=Bits.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2011 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	var Constructor;
	(function (Constructor) {
	    /**
	     * Get the lowest constructor in a class hierarchy.
	     *
	     * @param clazz The class to use as a starting point.
	     * @return The lowest constructor in the class hierarchy
	     */
	    function getBaseClass(clazz) {
	        var base = Object.getPrototypeOf(clazz);
	        while (base.name) {
	            clazz = base;
	            base = Object.getPrototypeOf(clazz);
	        }
	        return clazz;
	    }
	    Constructor.getBaseClass = getBaseClass;
	    /**
	     * Get the constructor for a specified instance
	     *
	     * @param inst the instance to get the constructor for
	     * @return the constructor.
	     */
	    function getFor(inst) {
	        return Object.getPrototypeOf(inst).constructor;
	    }
	    Constructor.getFor = getFor;
	})(Constructor = exports.Constructor || (exports.Constructor = {}));
	//# sourceMappingURL=Constructor.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/* MIT license */
	var cssKeywords = __webpack_require__(15);
	
	// NOTE: conversions should only return primitive values (i.e. arrays, or
	//       values that give correct `typeof` results).
	//       do not use box values types (i.e. Number(), String(), etc.)
	
	var reverseKeywords = {};
	for (var key in cssKeywords) {
		if (cssKeywords.hasOwnProperty(key)) {
			reverseKeywords[cssKeywords[key]] = key;
		}
	}
	
	var convert = module.exports = {
		rgb: {channels: 3, labels: 'rgb'},
		hsl: {channels: 3, labels: 'hsl'},
		hsv: {channels: 3, labels: 'hsv'},
		hwb: {channels: 3, labels: 'hwb'},
		cmyk: {channels: 4, labels: 'cmyk'},
		xyz: {channels: 3, labels: 'xyz'},
		lab: {channels: 3, labels: 'lab'},
		lch: {channels: 3, labels: 'lch'},
		hex: {channels: 1, labels: ['hex']},
		keyword: {channels: 1, labels: ['keyword']},
		ansi16: {channels: 1, labels: ['ansi16']},
		ansi256: {channels: 1, labels: ['ansi256']},
		hcg: {channels: 3, labels: ['h', 'c', 'g']},
		apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
		gray: {channels: 1, labels: ['gray']}
	};
	
	// hide .channels and .labels properties
	for (var model in convert) {
		if (convert.hasOwnProperty(model)) {
			if (!('channels' in convert[model])) {
				throw new Error('missing channels property: ' + model);
			}
	
			if (!('labels' in convert[model])) {
				throw new Error('missing channel labels property: ' + model);
			}
	
			if (convert[model].labels.length !== convert[model].channels) {
				throw new Error('channel and label counts mismatch: ' + model);
			}
	
			var channels = convert[model].channels;
			var labels = convert[model].labels;
			delete convert[model].channels;
			delete convert[model].labels;
			Object.defineProperty(convert[model], 'channels', {value: channels});
			Object.defineProperty(convert[model], 'labels', {value: labels});
		}
	}
	
	convert.rgb.hsl = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);
		var delta = max - min;
		var h;
		var s;
		var l;
	
		if (max === min) {
			h = 0;
		} else if (r === max) {
			h = (g - b) / delta;
		} else if (g === max) {
			h = 2 + (b - r) / delta;
		} else if (b === max) {
			h = 4 + (r - g) / delta;
		}
	
		h = Math.min(h * 60, 360);
	
		if (h < 0) {
			h += 360;
		}
	
		l = (min + max) / 2;
	
		if (max === min) {
			s = 0;
		} else if (l <= 0.5) {
			s = delta / (max + min);
		} else {
			s = delta / (2 - max - min);
		}
	
		return [h, s * 100, l * 100];
	};
	
	convert.rgb.hsv = function (rgb) {
		var rdif;
		var gdif;
		var bdif;
		var h;
		var s;
	
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var v = Math.max(r, g, b);
		var diff = v - Math.min(r, g, b);
		var diffc = function (c) {
			return (v - c) / 6 / diff + 1 / 2;
		};
	
		if (diff === 0) {
			h = s = 0;
		} else {
			s = diff / v;
			rdif = diffc(r);
			gdif = diffc(g);
			bdif = diffc(b);
	
			if (r === v) {
				h = bdif - gdif;
			} else if (g === v) {
				h = (1 / 3) + rdif - bdif;
			} else if (b === v) {
				h = (2 / 3) + gdif - rdif;
			}
			if (h < 0) {
				h += 1;
			} else if (h > 1) {
				h -= 1;
			}
		}
	
		return [
			h * 360,
			s * 100,
			v * 100
		];
	};
	
	convert.rgb.hwb = function (rgb) {
		var r = rgb[0];
		var g = rgb[1];
		var b = rgb[2];
		var h = convert.rgb.hsl(rgb)[0];
		var w = 1 / 255 * Math.min(r, Math.min(g, b));
	
		b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
	
		return [h, w * 100, b * 100];
	};
	
	convert.rgb.cmyk = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var c;
		var m;
		var y;
		var k;
	
		k = Math.min(1 - r, 1 - g, 1 - b);
		c = (1 - r - k) / (1 - k) || 0;
		m = (1 - g - k) / (1 - k) || 0;
		y = (1 - b - k) / (1 - k) || 0;
	
		return [c * 100, m * 100, y * 100, k * 100];
	};
	
	/**
	 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	 * */
	function comparativeDistance(x, y) {
		return (
			Math.pow(x[0] - y[0], 2) +
			Math.pow(x[1] - y[1], 2) +
			Math.pow(x[2] - y[2], 2)
		);
	}
	
	convert.rgb.keyword = function (rgb) {
		var reversed = reverseKeywords[rgb];
		if (reversed) {
			return reversed;
		}
	
		var currentClosestDistance = Infinity;
		var currentClosestKeyword;
	
		for (var keyword in cssKeywords) {
			if (cssKeywords.hasOwnProperty(keyword)) {
				var value = cssKeywords[keyword];
	
				// Compute comparative distance
				var distance = comparativeDistance(rgb, value);
	
				// Check if its less, if so set as closest
				if (distance < currentClosestDistance) {
					currentClosestDistance = distance;
					currentClosestKeyword = keyword;
				}
			}
		}
	
		return currentClosestKeyword;
	};
	
	convert.keyword.rgb = function (keyword) {
		return cssKeywords[keyword];
	};
	
	convert.rgb.xyz = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
	
		// assume sRGB
		r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
		g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
		b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
	
		var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
		var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
		var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
	
		return [x * 100, y * 100, z * 100];
	};
	
	convert.rgb.lab = function (rgb) {
		var xyz = convert.rgb.xyz(rgb);
		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		var l;
		var a;
		var b;
	
		x /= 95.047;
		y /= 100;
		z /= 108.883;
	
		x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
	
		l = (116 * y) - 16;
		a = 500 * (x - y);
		b = 200 * (y - z);
	
		return [l, a, b];
	};
	
	convert.hsl.rgb = function (hsl) {
		var h = hsl[0] / 360;
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var t1;
		var t2;
		var t3;
		var rgb;
		var val;
	
		if (s === 0) {
			val = l * 255;
			return [val, val, val];
		}
	
		if (l < 0.5) {
			t2 = l * (1 + s);
		} else {
			t2 = l + s - l * s;
		}
	
		t1 = 2 * l - t2;
	
		rgb = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * -(i - 1);
			if (t3 < 0) {
				t3++;
			}
			if (t3 > 1) {
				t3--;
			}
	
			if (6 * t3 < 1) {
				val = t1 + (t2 - t1) * 6 * t3;
			} else if (2 * t3 < 1) {
				val = t2;
			} else if (3 * t3 < 2) {
				val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			} else {
				val = t1;
			}
	
			rgb[i] = val * 255;
		}
	
		return rgb;
	};
	
	convert.hsl.hsv = function (hsl) {
		var h = hsl[0];
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var smin = s;
		var lmin = Math.max(l, 0.01);
		var sv;
		var v;
	
		l *= 2;
		s *= (l <= 1) ? l : 2 - l;
		smin *= lmin <= 1 ? lmin : 2 - lmin;
		v = (l + s) / 2;
		sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);
	
		return [h, sv * 100, v * 100];
	};
	
	convert.hsv.rgb = function (hsv) {
		var h = hsv[0] / 60;
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
		var hi = Math.floor(h) % 6;
	
		var f = h - Math.floor(h);
		var p = 255 * v * (1 - s);
		var q = 255 * v * (1 - (s * f));
		var t = 255 * v * (1 - (s * (1 - f)));
		v *= 255;
	
		switch (hi) {
			case 0:
				return [v, t, p];
			case 1:
				return [q, v, p];
			case 2:
				return [p, v, t];
			case 3:
				return [p, q, v];
			case 4:
				return [t, p, v];
			case 5:
				return [v, p, q];
		}
	};
	
	convert.hsv.hsl = function (hsv) {
		var h = hsv[0];
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
		var vmin = Math.max(v, 0.01);
		var lmin;
		var sl;
		var l;
	
		l = (2 - s) * v;
		lmin = (2 - s) * vmin;
		sl = s * vmin;
		sl /= (lmin <= 1) ? lmin : 2 - lmin;
		sl = sl || 0;
		l /= 2;
	
		return [h, sl * 100, l * 100];
	};
	
	// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
	convert.hwb.rgb = function (hwb) {
		var h = hwb[0] / 360;
		var wh = hwb[1] / 100;
		var bl = hwb[2] / 100;
		var ratio = wh + bl;
		var i;
		var v;
		var f;
		var n;
	
		// wh + bl cant be > 1
		if (ratio > 1) {
			wh /= ratio;
			bl /= ratio;
		}
	
		i = Math.floor(6 * h);
		v = 1 - bl;
		f = 6 * h - i;
	
		if ((i & 0x01) !== 0) {
			f = 1 - f;
		}
	
		n = wh + f * (v - wh); // linear interpolation
	
		var r;
		var g;
		var b;
		switch (i) {
			default:
			case 6:
			case 0: r = v; g = n; b = wh; break;
			case 1: r = n; g = v; b = wh; break;
			case 2: r = wh; g = v; b = n; break;
			case 3: r = wh; g = n; b = v; break;
			case 4: r = n; g = wh; b = v; break;
			case 5: r = v; g = wh; b = n; break;
		}
	
		return [r * 255, g * 255, b * 255];
	};
	
	convert.cmyk.rgb = function (cmyk) {
		var c = cmyk[0] / 100;
		var m = cmyk[1] / 100;
		var y = cmyk[2] / 100;
		var k = cmyk[3] / 100;
		var r;
		var g;
		var b;
	
		r = 1 - Math.min(1, c * (1 - k) + k);
		g = 1 - Math.min(1, m * (1 - k) + k);
		b = 1 - Math.min(1, y * (1 - k) + k);
	
		return [r * 255, g * 255, b * 255];
	};
	
	convert.xyz.rgb = function (xyz) {
		var x = xyz[0] / 100;
		var y = xyz[1] / 100;
		var z = xyz[2] / 100;
		var r;
		var g;
		var b;
	
		r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
		g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
		b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
	
		// assume sRGB
		r = r > 0.0031308
			? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
			: r * 12.92;
	
		g = g > 0.0031308
			? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
			: g * 12.92;
	
		b = b > 0.0031308
			? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
			: b * 12.92;
	
		r = Math.min(Math.max(0, r), 1);
		g = Math.min(Math.max(0, g), 1);
		b = Math.min(Math.max(0, b), 1);
	
		return [r * 255, g * 255, b * 255];
	};
	
	convert.xyz.lab = function (xyz) {
		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		var l;
		var a;
		var b;
	
		x /= 95.047;
		y /= 100;
		z /= 108.883;
	
		x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
	
		l = (116 * y) - 16;
		a = 500 * (x - y);
		b = 200 * (y - z);
	
		return [l, a, b];
	};
	
	convert.lab.xyz = function (lab) {
		var l = lab[0];
		var a = lab[1];
		var b = lab[2];
		var x;
		var y;
		var z;
	
		y = (l + 16) / 116;
		x = a / 500 + y;
		z = y - b / 200;
	
		var y2 = Math.pow(y, 3);
		var x2 = Math.pow(x, 3);
		var z2 = Math.pow(z, 3);
		y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
		x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
		z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
	
		x *= 95.047;
		y *= 100;
		z *= 108.883;
	
		return [x, y, z];
	};
	
	convert.lab.lch = function (lab) {
		var l = lab[0];
		var a = lab[1];
		var b = lab[2];
		var hr;
		var h;
		var c;
	
		hr = Math.atan2(b, a);
		h = hr * 360 / 2 / Math.PI;
	
		if (h < 0) {
			h += 360;
		}
	
		c = Math.sqrt(a * a + b * b);
	
		return [l, c, h];
	};
	
	convert.lch.lab = function (lch) {
		var l = lch[0];
		var c = lch[1];
		var h = lch[2];
		var a;
		var b;
		var hr;
	
		hr = h / 360 * 2 * Math.PI;
		a = c * Math.cos(hr);
		b = c * Math.sin(hr);
	
		return [l, a, b];
	};
	
	convert.rgb.ansi16 = function (args) {
		var r = args[0];
		var g = args[1];
		var b = args[2];
		var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization
	
		value = Math.round(value / 50);
	
		if (value === 0) {
			return 30;
		}
	
		var ansi = 30
			+ ((Math.round(b / 255) << 2)
			| (Math.round(g / 255) << 1)
			| Math.round(r / 255));
	
		if (value === 2) {
			ansi += 60;
		}
	
		return ansi;
	};
	
	convert.hsv.ansi16 = function (args) {
		// optimization here; we already know the value and don't need to get
		// it converted for us.
		return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
	};
	
	convert.rgb.ansi256 = function (args) {
		var r = args[0];
		var g = args[1];
		var b = args[2];
	
		// we use the extended greyscale palette here, with the exception of
		// black and white. normal palette only has 4 greyscale shades.
		if (r === g && g === b) {
			if (r < 8) {
				return 16;
			}
	
			if (r > 248) {
				return 231;
			}
	
			return Math.round(((r - 8) / 247) * 24) + 232;
		}
	
		var ansi = 16
			+ (36 * Math.round(r / 255 * 5))
			+ (6 * Math.round(g / 255 * 5))
			+ Math.round(b / 255 * 5);
	
		return ansi;
	};
	
	convert.ansi16.rgb = function (args) {
		var color = args % 10;
	
		// handle greyscale
		if (color === 0 || color === 7) {
			if (args > 50) {
				color += 3.5;
			}
	
			color = color / 10.5 * 255;
	
			return [color, color, color];
		}
	
		var mult = (~~(args > 50) + 1) * 0.5;
		var r = ((color & 1) * mult) * 255;
		var g = (((color >> 1) & 1) * mult) * 255;
		var b = (((color >> 2) & 1) * mult) * 255;
	
		return [r, g, b];
	};
	
	convert.ansi256.rgb = function (args) {
		// handle greyscale
		if (args >= 232) {
			var c = (args - 232) * 10 + 8;
			return [c, c, c];
		}
	
		args -= 16;
	
		var rem;
		var r = Math.floor(args / 36) / 5 * 255;
		var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
		var b = (rem % 6) / 5 * 255;
	
		return [r, g, b];
	};
	
	convert.rgb.hex = function (args) {
		var integer = ((Math.round(args[0]) & 0xFF) << 16)
			+ ((Math.round(args[1]) & 0xFF) << 8)
			+ (Math.round(args[2]) & 0xFF);
	
		var string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};
	
	convert.hex.rgb = function (args) {
		var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
		if (!match) {
			return [0, 0, 0];
		}
	
		var colorString = match[0];
	
		if (match[0].length === 3) {
			colorString = colorString.split('').map(function (char) {
				return char + char;
			}).join('');
		}
	
		var integer = parseInt(colorString, 16);
		var r = (integer >> 16) & 0xFF;
		var g = (integer >> 8) & 0xFF;
		var b = integer & 0xFF;
	
		return [r, g, b];
	};
	
	convert.rgb.hcg = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var max = Math.max(Math.max(r, g), b);
		var min = Math.min(Math.min(r, g), b);
		var chroma = (max - min);
		var grayscale;
		var hue;
	
		if (chroma < 1) {
			grayscale = min / (1 - chroma);
		} else {
			grayscale = 0;
		}
	
		if (chroma <= 0) {
			hue = 0;
		} else
		if (max === r) {
			hue = ((g - b) / chroma) % 6;
		} else
		if (max === g) {
			hue = 2 + (b - r) / chroma;
		} else {
			hue = 4 + (r - g) / chroma + 4;
		}
	
		hue /= 6;
		hue %= 1;
	
		return [hue * 360, chroma * 100, grayscale * 100];
	};
	
	convert.hsl.hcg = function (hsl) {
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var c = 1;
		var f = 0;
	
		if (l < 0.5) {
			c = 2.0 * s * l;
		} else {
			c = 2.0 * s * (1.0 - l);
		}
	
		if (c < 1.0) {
			f = (l - 0.5 * c) / (1.0 - c);
		}
	
		return [hsl[0], c * 100, f * 100];
	};
	
	convert.hsv.hcg = function (hsv) {
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
	
		var c = s * v;
		var f = 0;
	
		if (c < 1.0) {
			f = (v - c) / (1 - c);
		}
	
		return [hsv[0], c * 100, f * 100];
	};
	
	convert.hcg.rgb = function (hcg) {
		var h = hcg[0] / 360;
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
	
		if (c === 0.0) {
			return [g * 255, g * 255, g * 255];
		}
	
		var pure = [0, 0, 0];
		var hi = (h % 1) * 6;
		var v = hi % 1;
		var w = 1 - v;
		var mg = 0;
	
		switch (Math.floor(hi)) {
			case 0:
				pure[0] = 1; pure[1] = v; pure[2] = 0; break;
			case 1:
				pure[0] = w; pure[1] = 1; pure[2] = 0; break;
			case 2:
				pure[0] = 0; pure[1] = 1; pure[2] = v; break;
			case 3:
				pure[0] = 0; pure[1] = w; pure[2] = 1; break;
			case 4:
				pure[0] = v; pure[1] = 0; pure[2] = 1; break;
			default:
				pure[0] = 1; pure[1] = 0; pure[2] = w;
		}
	
		mg = (1.0 - c) * g;
	
		return [
			(c * pure[0] + mg) * 255,
			(c * pure[1] + mg) * 255,
			(c * pure[2] + mg) * 255
		];
	};
	
	convert.hcg.hsv = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
	
		var v = c + g * (1.0 - c);
		var f = 0;
	
		if (v > 0.0) {
			f = c / v;
		}
	
		return [hcg[0], f * 100, v * 100];
	};
	
	convert.hcg.hsl = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
	
		var l = g * (1.0 - c) + 0.5 * c;
		var s = 0;
	
		if (l > 0.0 && l < 0.5) {
			s = c / (2 * l);
		} else
		if (l >= 0.5 && l < 1.0) {
			s = c / (2 * (1 - l));
		}
	
		return [hcg[0], s * 100, l * 100];
	};
	
	convert.hcg.hwb = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
		var v = c + g * (1.0 - c);
		return [hcg[0], (v - c) * 100, (1 - v) * 100];
	};
	
	convert.hwb.hcg = function (hwb) {
		var w = hwb[1] / 100;
		var b = hwb[2] / 100;
		var v = 1 - b;
		var c = v - w;
		var g = 0;
	
		if (c < 1) {
			g = (v - c) / (1 - c);
		}
	
		return [hwb[0], c * 100, g * 100];
	};
	
	convert.apple.rgb = function (apple) {
		return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
	};
	
	convert.rgb.apple = function (rgb) {
		return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
	};
	
	convert.gray.rgb = function (args) {
		return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
	};
	
	convert.gray.hsl = convert.gray.hsv = function (args) {
		return [0, 0, args[0]];
	};
	
	convert.gray.hwb = function (gray) {
		return [0, 100, gray[0]];
	};
	
	convert.gray.cmyk = function (gray) {
		return [0, 0, 0, gray[0]];
	};
	
	convert.gray.lab = function (gray) {
		return [gray[0], 0, 0];
	};
	
	convert.gray.hex = function (gray) {
		var val = Math.round(gray[0] / 100 * 255) & 0xFF;
		var integer = (val << 16) + (val << 8) + val;
	
		var string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};
	
	convert.rgb.gray = function (rgb) {
		var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
		return [val / 255 * 100];
	};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict'
	
	module.exports = {
		"aliceblue": [240, 248, 255],
		"antiquewhite": [250, 235, 215],
		"aqua": [0, 255, 255],
		"aquamarine": [127, 255, 212],
		"azure": [240, 255, 255],
		"beige": [245, 245, 220],
		"bisque": [255, 228, 196],
		"black": [0, 0, 0],
		"blanchedalmond": [255, 235, 205],
		"blue": [0, 0, 255],
		"blueviolet": [138, 43, 226],
		"brown": [165, 42, 42],
		"burlywood": [222, 184, 135],
		"cadetblue": [95, 158, 160],
		"chartreuse": [127, 255, 0],
		"chocolate": [210, 105, 30],
		"coral": [255, 127, 80],
		"cornflowerblue": [100, 149, 237],
		"cornsilk": [255, 248, 220],
		"crimson": [220, 20, 60],
		"cyan": [0, 255, 255],
		"darkblue": [0, 0, 139],
		"darkcyan": [0, 139, 139],
		"darkgoldenrod": [184, 134, 11],
		"darkgray": [169, 169, 169],
		"darkgreen": [0, 100, 0],
		"darkgrey": [169, 169, 169],
		"darkkhaki": [189, 183, 107],
		"darkmagenta": [139, 0, 139],
		"darkolivegreen": [85, 107, 47],
		"darkorange": [255, 140, 0],
		"darkorchid": [153, 50, 204],
		"darkred": [139, 0, 0],
		"darksalmon": [233, 150, 122],
		"darkseagreen": [143, 188, 143],
		"darkslateblue": [72, 61, 139],
		"darkslategray": [47, 79, 79],
		"darkslategrey": [47, 79, 79],
		"darkturquoise": [0, 206, 209],
		"darkviolet": [148, 0, 211],
		"deeppink": [255, 20, 147],
		"deepskyblue": [0, 191, 255],
		"dimgray": [105, 105, 105],
		"dimgrey": [105, 105, 105],
		"dodgerblue": [30, 144, 255],
		"firebrick": [178, 34, 34],
		"floralwhite": [255, 250, 240],
		"forestgreen": [34, 139, 34],
		"fuchsia": [255, 0, 255],
		"gainsboro": [220, 220, 220],
		"ghostwhite": [248, 248, 255],
		"gold": [255, 215, 0],
		"goldenrod": [218, 165, 32],
		"gray": [128, 128, 128],
		"green": [0, 128, 0],
		"greenyellow": [173, 255, 47],
		"grey": [128, 128, 128],
		"honeydew": [240, 255, 240],
		"hotpink": [255, 105, 180],
		"indianred": [205, 92, 92],
		"indigo": [75, 0, 130],
		"ivory": [255, 255, 240],
		"khaki": [240, 230, 140],
		"lavender": [230, 230, 250],
		"lavenderblush": [255, 240, 245],
		"lawngreen": [124, 252, 0],
		"lemonchiffon": [255, 250, 205],
		"lightblue": [173, 216, 230],
		"lightcoral": [240, 128, 128],
		"lightcyan": [224, 255, 255],
		"lightgoldenrodyellow": [250, 250, 210],
		"lightgray": [211, 211, 211],
		"lightgreen": [144, 238, 144],
		"lightgrey": [211, 211, 211],
		"lightpink": [255, 182, 193],
		"lightsalmon": [255, 160, 122],
		"lightseagreen": [32, 178, 170],
		"lightskyblue": [135, 206, 250],
		"lightslategray": [119, 136, 153],
		"lightslategrey": [119, 136, 153],
		"lightsteelblue": [176, 196, 222],
		"lightyellow": [255, 255, 224],
		"lime": [0, 255, 0],
		"limegreen": [50, 205, 50],
		"linen": [250, 240, 230],
		"magenta": [255, 0, 255],
		"maroon": [128, 0, 0],
		"mediumaquamarine": [102, 205, 170],
		"mediumblue": [0, 0, 205],
		"mediumorchid": [186, 85, 211],
		"mediumpurple": [147, 112, 219],
		"mediumseagreen": [60, 179, 113],
		"mediumslateblue": [123, 104, 238],
		"mediumspringgreen": [0, 250, 154],
		"mediumturquoise": [72, 209, 204],
		"mediumvioletred": [199, 21, 133],
		"midnightblue": [25, 25, 112],
		"mintcream": [245, 255, 250],
		"mistyrose": [255, 228, 225],
		"moccasin": [255, 228, 181],
		"navajowhite": [255, 222, 173],
		"navy": [0, 0, 128],
		"oldlace": [253, 245, 230],
		"olive": [128, 128, 0],
		"olivedrab": [107, 142, 35],
		"orange": [255, 165, 0],
		"orangered": [255, 69, 0],
		"orchid": [218, 112, 214],
		"palegoldenrod": [238, 232, 170],
		"palegreen": [152, 251, 152],
		"paleturquoise": [175, 238, 238],
		"palevioletred": [219, 112, 147],
		"papayawhip": [255, 239, 213],
		"peachpuff": [255, 218, 185],
		"peru": [205, 133, 63],
		"pink": [255, 192, 203],
		"plum": [221, 160, 221],
		"powderblue": [176, 224, 230],
		"purple": [128, 0, 128],
		"rebeccapurple": [102, 51, 153],
		"red": [255, 0, 0],
		"rosybrown": [188, 143, 143],
		"royalblue": [65, 105, 225],
		"saddlebrown": [139, 69, 19],
		"salmon": [250, 128, 114],
		"sandybrown": [244, 164, 96],
		"seagreen": [46, 139, 87],
		"seashell": [255, 245, 238],
		"sienna": [160, 82, 45],
		"silver": [192, 192, 192],
		"skyblue": [135, 206, 235],
		"slateblue": [106, 90, 205],
		"slategray": [112, 128, 144],
		"slategrey": [112, 128, 144],
		"snow": [255, 250, 250],
		"springgreen": [0, 255, 127],
		"steelblue": [70, 130, 180],
		"tan": [210, 180, 140],
		"teal": [0, 128, 128],
		"thistle": [216, 191, 216],
		"tomato": [255, 99, 71],
		"turquoise": [64, 224, 208],
		"violet": [238, 130, 238],
		"wheat": [245, 222, 179],
		"white": [255, 255, 255],
		"whitesmoke": [245, 245, 245],
		"yellow": [255, 255, 0],
		"yellowgreen": [154, 205, 50]
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const LayeredGui_1 = __webpack_require__(30);
	exports.switchHtmlLayer = LayeredGui_1.switchHtmlLayer;
	var GameLayerId;
	(function (GameLayerId) {
	    GameLayerId[GameLayerId["Menu"] = 0] = "Menu";
	    GameLayerId[GameLayerId["Game"] = 1] = "Game";
	    GameLayerId[GameLayerId["GameOver"] = 2] = "GameOver";
	})(GameLayerId = exports.GameLayerId || (exports.GameLayerId = {}));


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function vec2add(v1, v2) {
	    return { x: v1.x + v2.x, y: v1.y + v2.y };
	}
	exports.vec2add = vec2add;
	function vec2sub(v1, v2) {
	    return { x: v1.x - v2.x, y: v1.y - v2.y };
	}
	exports.vec2sub = vec2sub;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	class WallComponent extends typed_ecstasy_1.Component {
	}
	exports.WallComponent = WallComponent;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const SnakeHeadComponent_1 = __webpack_require__(3);
	const DoubleLinkComponent_1 = __webpack_require__(8);
	const PositionComponent_1 = __webpack_require__(2);
	const DirectionComponent_1 = __webpack_require__(7);
	const FeedableComponent_1 = __webpack_require__(9);
	const SetEntityPosition_1 = __webpack_require__(6);
	const Vector_1 = __webpack_require__(17);
	const ObstacleComponent_1 = __webpack_require__(11);
	//--------------------------------------------------------------------------------------------------------
	/**
	 * Create initial snake consisting of three segments (head, middle and tail).
	 */
	function createAndAddSnake(ecs, playField, position, direction = DirectionComponent_1.randomDirection()) {
	    const directionVec = DirectionComponent_1.directionToVec2(direction);
	    const snakeTail = createSnakeSegment(ecs, playField, Vector_1.vec2sub(position, directionVec));
	    const snakeMiddle = createSnakeSegment(ecs, playField, position);
	    const snakeHead = createSnakeHead(ecs, playField, Vector_1.vec2add(position, directionVec), snakeTail, direction, 3);
	    DoubleLinkComponent_1.appendEntityToDoubleLinkedList(snakeTail, snakeMiddle);
	    DoubleLinkComponent_1.appendEntityToDoubleLinkedList(snakeMiddle, snakeHead);
	}
	exports.createAndAddSnake = createAndAddSnake;
	//--------------------------------------------------------------------------------------------------------
	/**
	 * Create a snake segment.
	 */
	function createSnakeSegment(ecs, playField, position = null) {
	    const result = ecs.createEntity();
	    result.add(new PositionComponent_1.PositionComponent);
	    result.add(new DoubleLinkComponent_1.DoubleLinkComponent);
	    result.add(new ObstacleComponent_1.ObstacleComponent); // to detect collision with itself
	    ecs.addEntity(result);
	    if (position !== null) {
	        SetEntityPosition_1.setEntityPosition(playField, result, position);
	    }
	    return result;
	}
	exports.createSnakeSegment = createSnakeSegment;
	//--------------------------------------------------------------------------------------------------------
	/**
	 * Create a snake head.
	 */
	function createSnakeHead(ecs, playField, position = null, snakeTail, direction, length) {
	    const result = ecs.createEntity();
	    result.add(new PositionComponent_1.PositionComponent);
	    result.add(new DoubleLinkComponent_1.DoubleLinkComponent);
	    result.add(new SnakeHeadComponent_1.SnakeHeadComponent(snakeTail.getId(), true, length));
	    result.add(new DirectionComponent_1.DirectionComponent(direction));
	    result.add(new DirectionComponent_1.RequestedDirectionComponent);
	    result.add(new FeedableComponent_1.FeedableComponent);
	    ecs.addEntity(result);
	    if (position !== null) {
	        SetEntityPosition_1.setEntityPosition(playField, result, position);
	    }
	    return result;
	}
	exports.createSnakeHead = createSnakeHead;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2015 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	var Bits_1 = __webpack_require__(12);
	var UniqueType_1 = __webpack_require__(5);
	/**
	 * Simple containers of {@link Component Components} that give them "data".
	 * The component's data is then processed by {@link EntitySystem}s.
	 */
	var Entity = /** @class */ (function () {
	    function Entity() {
	        /** A flag that can be used to bit mask this entity. Up to the user to manage. */
	        this.flags = 0;
	        this.uuid = 0;
	        this.scheduledForRemoval = false;
	        this.componentsByType = {};
	        this.components = [];
	        this.componentBits = new Bits_1.Bits();
	        this.familyBits = new Bits_1.Bits();
	        this.engine = null;
	    }
	    /** @return The Entity's unique id. */
	    Entity.prototype.getId = function () { return this.uuid; };
	    /** @return true if the entity is valid (added to the engine). */
	    Entity.prototype.isValid = function () { return this.uuid > 0; };
	    /** @return true if the entity is scheduled to be removed */
	    Entity.prototype.isScheduledForRemoval = function () { return this.scheduledForRemoval; };
	    /** Remove this entity from its engine */
	    Entity.prototype.destroy = function () {
	        if (this.engine)
	            this.engine.removeEntity(this);
	    };
	    /**
	     * Add a component. This will be freed on removal. Prefer add() instead
	     *
	     * @typeparam T The component class
	     * @param component the component to add
	     * @return The added component
	     */
	    Entity.prototype.add = function (component) {
	        if (this.addInternal(component) && this.engine)
	            this.engine.requestFamilyUpdate(this);
	        return component;
	    };
	    /**
	     * Removes the Component of the specified type. Since there is only ever one Component of one type, we don't
	     * need an instance reference.
	     *
	     * @param clazz The Component class
	     */
	    Entity.prototype.remove = function (clazz) {
	        var type = UniqueType_1.UniqueType.getForClass(clazz);
	        if (this.removeInternal(type) && this.engine)
	            this.engine.requestFamilyUpdate(this);
	    };
	    /** Removes all the {@link Component}s from the Entity. */
	    Entity.prototype.removeAll = function () {
	        if (this.removeAllInternal() && this.engine)
	            this.engine.requestFamilyUpdate(this);
	    };
	    /** @return A list with all the {@link Component}s of this Entity. */
	    Entity.prototype.getAll = function () {
	        return this.components;
	    };
	    /**
	     * Retrieve a Component from this Entity by class.
	     *
	     * @typeparam T The component class
	     * @param clazz The Component class
	     * @return The instance of the specified Component attached to this Entity, or null if no such Component exists.
	     */
	    Entity.prototype.get = function (clazz) {
	        return (this.getComponent(UniqueType_1.UniqueType.getForClass(clazz)));
	    };
	    /**
	     * @param clazz The Component class
	     * @return Whether or not the Entity has a Component for the specified class.
	     */
	    Entity.prototype.has = function (clazz) {
	        return this.componentBits.get(UniqueType_1.UniqueType.getForClass(clazz).getIndex());
	    };
	    /** @return The Component object for the specified class, null if the Entity does not have any components for that class. */
	    Entity.prototype.getComponent = function (uniqueType) {
	        var index = uniqueType.getIndex();
	        return this.componentsByType[index] || null;
	    };
	    Entity.prototype.addInternal = function (component) {
	        var type = UniqueType_1.UniqueType.getForInstance(component);
	        var oldComponent = this.getComponent(type);
	        if (component === oldComponent)
	            return false;
	        if (oldComponent != null)
	            this.removeInternal(type);
	        var typeIndex = type.getIndex();
	        this.componentsByType[typeIndex] = component;
	        this.components.push(component);
	        this.componentBits.set(typeIndex);
	        return true;
	    };
	    Entity.prototype.removeInternal = function (type) {
	        var index = type.getIndex();
	        var component = this.componentsByType[index];
	        if (component) {
	            delete this.componentsByType[index];
	            var index2 = this.components.indexOf(component);
	            this.components.splice(index2, 1);
	            this.componentBits.clear(index);
	            // component.onDestruct();
	        }
	        return component;
	    };
	    Entity.prototype.removeAllInternal = function () {
	        if (this.components.length) {
	            while (this.components.length)
	                this.removeInternal(UniqueType_1.UniqueType.getForInstance(this.components[0]));
	            return true;
	        }
	        return false;
	    };
	    /** @return This Entity's Component bits, describing all the {@link Component}s it contains. */
	    Entity.prototype.getComponentBits = function () {
	        return this.componentBits;
	    };
	    /** @return This Entity's Family bits, describing all the {@link EntitySystem}s it currently is being processed by. */
	    Entity.prototype.getFamilyBits = function () {
	        return this.familyBits;
	    };
	    return Entity;
	}());
	exports.Entity = Entity;
	//# sourceMappingURL=Entity.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	/*******************************************************************************
	 * Copyright 2015 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	var UniqueType_1 = __webpack_require__(5);
	var Bits_1 = __webpack_require__(12);
	function addBitsString(ss, prefix, bits) {
	    ss.push(prefix);
	    ss.push(bits.getStringId());
	    ss.push(";");
	}
	function getFamilyHash(all, one, exclude) {
	    var ss = [];
	    if (!all.isEmpty())
	        addBitsString(ss, "a:", all);
	    if (!one.isEmpty())
	        addBitsString(ss, "o:", one);
	    if (!exclude.isEmpty())
	        addBitsString(ss, "e:", exclude);
	    return ss.join('');
	}
	var families = {};
	var familiesByIndex = [];
	/**
	 * A builder pattern to create Family objects.
	 * Use Family.all(), Family.one() or Family.exclude() to start
	 *
	 * Example usage:
	 *```typescript
	 *let family = Family.all(ComponentA, ComponentB).one(ComponentC, ComponentD).exclude(ComponentE).get();
	 *```
	 */
	var FamilyBuilder = /** @class */ (function () {
	    function FamilyBuilder() {
	        this.m_all = new Bits_1.Bits();
	        this.m_one = new Bits_1.Bits();
	        this.m_exclude = new Bits_1.Bits();
	    }
	    /**
	     * Resets the builder instance
	     *
	     * @return this for chaining
	     */
	    FamilyBuilder.prototype.reset = function () {
	        this.m_all.clearAll();
	        this.m_one.clearAll();
	        this.m_exclude.clearAll();
	        return this;
	    };
	    /**
	     * @param clazzes Entities of the family will have to contain all of the specified components.
	     * @return this for chaining
	     */
	    FamilyBuilder.prototype.all = function () {
	        var clazzes = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            clazzes[_i] = arguments[_i];
	        }
	        UniqueType_1.UniqueType.getBitsForClasses.apply(UniqueType_1.UniqueType, [this.m_all].concat(clazzes));
	        return this;
	    };
	    /**
	     * @param clazzes Entities of the family will have to contain at least one of the specified components.
	     * @return this for chaining
	     */
	    FamilyBuilder.prototype.one = function () {
	        var clazzes = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            clazzes[_i] = arguments[_i];
	        }
	        UniqueType_1.UniqueType.getBitsForClasses.apply(UniqueType_1.UniqueType, [this.m_one].concat(clazzes));
	        return this;
	    };
	    /**
	     * @param clazzes Entities of the family cannot contain any of the specified components.
	     * @return this for chaining
	     */
	    FamilyBuilder.prototype.exclude = function () {
	        var clazzes = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            clazzes[_i] = arguments[_i];
	        }
	        UniqueType_1.UniqueType.getBitsForClasses.apply(UniqueType_1.UniqueType, [this.m_exclude].concat(clazzes));
	        return this;
	    };
	    /** @return A Family for the configured component types */
	    FamilyBuilder.prototype.get = function () {
	        var hash = getFamilyHash(this.m_all, this.m_one, this.m_exclude);
	        var family = families[hash];
	        if (!family) {
	            family = new FamilyImpl(this.m_all, this.m_one, this.m_exclude);
	            familiesByIndex.push(family);
	            families[hash] = family;
	            this.m_all = new Bits_1.Bits();
	            this.m_one = new Bits_1.Bits();
	            this.m_exclude = new Bits_1.Bits();
	        }
	        return family;
	    };
	    return FamilyBuilder;
	}());
	exports.FamilyBuilder = FamilyBuilder;
	var builder = new FamilyBuilder();
	var familyTypes = 0;
	/**
	 * Represents a group of {@link Component}s. It is used to describe what Entity objects an EntitySystem should
	 * process. Families can't be instantiated directly but must be accessed via a builder.
	 * This is to avoid duplicate families that describe the same components
	 * Start with {@link Family.all}, {@link Family.one} or {@link Family.exclude}.
	 */
	var Family = /** @class */ (function () {
	    function Family() {
	        this.uniqueType = new UniqueType_1.UniqueType(familyTypes++, 'Family');
	    }
	    /**
	     * @param clazzes Entities will have to contain all of the specified components.
	     * @return A builder singleton instance to get a Family
	     */
	    Family.all = function () {
	        var clazzes = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            clazzes[_i] = arguments[_i];
	        }
	        return (_a = builder.reset()).all.apply(_a, clazzes);
	        var _a;
	    };
	    /**
	     * @param clazzes Entities will have to contain at least one of the specified components.
	     * @return A builder singleton instance to get a Family
	     */
	    Family.one = function () {
	        var clazzes = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            clazzes[_i] = arguments[_i];
	        }
	        return (_a = builder.reset()).one.apply(_a, clazzes);
	        var _a;
	    };
	    /**
	     * @param clazzes Entities cannot contain any of the specified components.
	     * @return A builder singleton instance to get a Family
	     */
	    Family.exclude = function () {
	        var clazzes = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            clazzes[_i] = arguments[_i];
	        }
	        return (_a = builder.reset()).exclude.apply(_a, clazzes);
	        var _a;
	    };
	    /**
	     * Get a family by its index.
	     *
	     * @param index the index of the family
	     * @return The family or null if out of bounds
	     */
	    Family.getByIndex = function (index) {
	        if (index >= 0 && index < familiesByIndex.length)
	            return familiesByIndex[index];
	        return null;
	    };
	    return Family;
	}());
	exports.Family = Family;
	var FamilyImpl = /** @class */ (function (_super) {
	    __extends(FamilyImpl, _super);
	    function FamilyImpl(all, one, exclude) {
	        var _this = _super.call(this) || this;
	        _this.m_all = all;
	        _this.m_one = one;
	        _this.m_exclude = exclude;
	        return _this;
	    }
	    FamilyImpl.prototype.matches = function (entity) {
	        var entityComponentBits = entity.getComponentBits();
	        if (!entityComponentBits.containsAll(this.m_all))
	            return false;
	        if (!this.m_one.isEmpty() && !this.m_one.intersects(entityComponentBits))
	            return false;
	        if (!this.m_exclude.isEmpty() && this.m_exclude.intersects(entityComponentBits))
	            return false;
	        return true;
	    };
	    return FamilyImpl;
	}(Family));
	//# sourceMappingURL=Family.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2011 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	var UniqueType_1 = __webpack_require__(5);
	/**
	 * A lookup is used to store and retrieve instances bound to a specified class.
	 */
	var Lookup = /** @class */ (function () {
	    function Lookup() {
	        this.map = {};
	    }
	    /**
	     * Store an instance of a class
	     *
	     * @typeparam T The class used to get the instance later.
	     * @typeparam I The class of the instance.
	     * @param clazz The class used to get the instance later.
	     * @param instance The instance to store.
	     */
	    Lookup.prototype.put = function (clazz, instance) {
	        var type = UniqueType_1.UniqueType.getForClass(clazz);
	        this.map[type.hashCode()] = instance;
	        return instance;
	    };
	    /**
	     * Get an instance of a class
	     *
	     * @typeparam T The class the instance was bound to.
	     * @param clazz The class the instance was bound to.
	     */
	    Lookup.prototype.get = function (clazz) {
	        var type = UniqueType_1.UniqueType.getForClass(clazz);
	        return this.map[type.hashCode()] || null;
	    };
	    /**
	     * Check if an instance of the specified class exists.
	     *
	     * @typeparam T The class the instance was bound to.
	     * @param clazz The class the instance was bound to.
	     */
	    Lookup.prototype.has = function (clazz) {
	        var type = UniqueType_1.UniqueType.getForClass(clazz);
	        return this.map.hasOwnProperty(type.hashCode());
	    };
	    /**
	     * Remove an instance of a class
	     *
	     * @typeparam T The class the instance was bound to.
	     * @param clazz The class the instance was bound to.
	     */
	    Lookup.prototype.remove = function (clazz) {
	        var type = UniqueType_1.UniqueType.getForClass(clazz);
	        delete this.map[type.hashCode()];
	    };
	    return Lookup;
	}());
	exports.Lookup = Lookup;
	//# sourceMappingURL=Lookup.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";
	// CC0 Public Domain: http://creativecommons.org/publicdomain/zero/1.0/
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    }
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * SignalLink implements a doubly-linked ring with nodes containing the signal handlers.
	 */
	var SignalLink = /** @class */ (function () {
	    function SignalLink(prev, next, order) {
	        if (prev === void 0) { prev = null; }
	        if (next === void 0) { next = null; }
	        if (order === void 0) { order = 0; }
	        this.enabled = true;
	        this.newLink = false;
	        this.callback = null;
	        this.prev = prev ? prev : this;
	        this.next = next ? next : this;
	        this.order = order;
	    }
	    SignalLink.prototype.isEnabled = function () {
	        return this.enabled && !this.newLink;
	    };
	    SignalLink.prototype.setEnabled = function (flag) {
	        this.enabled = flag;
	    };
	    SignalLink.prototype.unlink = function () {
	        this.callback = null;
	        this.next.prev = this.prev;
	        this.prev.next = this.next;
	    };
	    SignalLink.prototype.insert = function (callback, order) {
	        var after = this.prev;
	        while (after !== this) {
	            if (after.order <= order)
	                break;
	            after = after.prev;
	        }
	        var link = new SignalLink(after, after.next, order);
	        link.callback = callback;
	        after.next = link;
	        link.next.prev = link;
	        return link;
	    };
	    return SignalLink;
	}());
	/**
	 * Implementation of SignalConnection, for internal use only.
	 */
	var SignalConnectionImpl = /** @class */ (function () {
	    /**
	     * @param head The head link of the signal.
	     * @param link The actual link of the connection.
	     */
	    function SignalConnectionImpl(head, link) {
	        this.link = link;
	    }
	    SignalConnectionImpl.prototype.disconnect = function () {
	        if (this.link !== null) {
	            this.link.unlink();
	            this.link = null;
	            return true;
	        }
	        return false;
	    };
	    Object.defineProperty(SignalConnectionImpl.prototype, "enabled", {
	        get: function () {
	            return this.link !== null && this.link.isEnabled();
	        },
	        set: function (enable) {
	            if (this.link)
	                this.link.setEnabled(enable);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SignalConnectionImpl;
	}());
	/**
	 * Represents a list of connections to a signal for easy disconnect.
	 */
	var SignalConnections = /** @class */ (function () {
	    function SignalConnections() {
	        this.list = [];
	    }
	    /**
	     * Add a connection to the list.
	     * @param connection
	     */
	    SignalConnections.prototype.add = function (connection) {
	        this.list.push(connection);
	    };
	    /**
	     * Disconnect all connections in the list and empty the list.
	     */
	    SignalConnections.prototype.disconnectAll = function () {
	        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
	            var connection = _a[_i];
	            connection.disconnect();
	        }
	        this.list = [];
	    };
	    return SignalConnections;
	}());
	exports.SignalConnections = SignalConnections;
	/**
	 * A signal is a way to publish and subscribe to events.
	 *
	 * @typeparam CB The function signature to be implemented by handlers.
	 */
	var Signal = /** @class */ (function () {
	    /**
	     * Create a new signal.
	     */
	    function Signal() {
	        this.head = new SignalLink();
	        this.hasNewLinks = false;
	        this.emitDepth = 0;
	        this.emit = this.emitInternal.bind(this);
	    }
	    /**
	     * Subscribe to this signal.
	     *
	     * @param callback This callback will be run when emit() is called.
	     * @param order Handlers with a higher order value will be called later.
	     */
	    Signal.prototype.connect = function (callback, order) {
	        if (order === void 0) { order = 0; }
	        var link = this.head.insert(callback, order);
	        if (this.emitDepth > 0) {
	            this.hasNewLinks = true;
	            link.newLink = true;
	        }
	        return new SignalConnectionImpl(this.head, link);
	    };
	    /**
	     * Unsubscribe from this signal with the original callback instance.
	     * While you can use this method, the SignalConnection returned by connect() will not be updated!
	     *
	     * @param callback The callback you passed to connect().
	     */
	    Signal.prototype.disconnect = function (callback) {
	        for (var link = this.head.next; link !== this.head; link = link.next) {
	            if (link.callback === callback) {
	                link.unlink();
	                return true;
	            }
	        }
	        return false;
	    };
	    /**
	     * Disconnect all handlers from this signal event.
	     */
	    Signal.prototype.disconnectAll = function () {
	        while (this.head.next !== this.head) {
	            this.head.next.unlink();
	        }
	    };
	    Signal.prototype.emitInternal = function () {
	        this.emitDepth++;
	        for (var link = this.head.next; link !== this.head; link = link.next) {
	            if (link.isEnabled() && link.callback)
	                link.callback.apply(null, arguments);
	        }
	        this.emitDepth--;
	        this.unsetNewLink();
	    };
	    Signal.prototype.emitCollecting = function (collector, args) {
	        this.emitDepth++;
	        for (var link = this.head.next; link !== this.head; link = link.next) {
	            if (link.isEnabled() && link.callback) {
	                var result = link.callback.apply(null, args);
	                if (!collector.handleResult(result))
	                    break;
	            }
	        }
	        this.emitDepth--;
	        this.unsetNewLink();
	    };
	    Signal.prototype.unsetNewLink = function () {
	        if (this.hasNewLinks && this.emitDepth == 0) {
	            for (var link = this.head.next; link !== this.head; link = link.next)
	                link.newLink = false;
	            this.hasNewLinks = false;
	        }
	    };
	    return Signal;
	}());
	exports.Signal = Signal;
	/**
	 * Base class for collectors.
	 *
	 * @typeparam CB The function signature to be implemented by handlers.
	 * @typeparam RT The return type of CB
	 */
	var Collector = /** @class */ (function () {
	    /**
	     * Create a new collector.
	     *
	     * @param signal The signal to emit.
	     */
	    function Collector(signal) {
	        var self = this;
	        this.emit = function () { signal.emitCollecting(self, arguments); };
	    }
	    return Collector;
	}());
	exports.Collector = Collector;
	/**
	 * Returns the result of the last signal handler from a signal emission.
	 *
	 * @typeparam CB The function signature to be implemented by handlers.
	 * @typeparam RT The return type of CB
	 */
	var CollectorLast = /** @class */ (function (_super) {
	    __extends(CollectorLast, _super);
	    function CollectorLast() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    CollectorLast.prototype.handleResult = function (result) {
	        this.result = result;
	        return true;
	    };
	    /**
	     * Get the result of the last signal handler.
	     */
	    CollectorLast.prototype.getResult = function () {
	        return this.result;
	    };
	    /**
	     * Reset the result
	     */
	    CollectorLast.prototype.reset = function () {
	        delete this.result;
	    };
	    return CollectorLast;
	}(Collector));
	exports.CollectorLast = CollectorLast;
	/**
	 * Keep signal emissions going while all handlers return true.
	 *
	 * @typeparam CB The function signature to be implemented by handlers.
	 * Return type of CB must be boolean.
	 */
	var CollectorUntil0 = /** @class */ (function (_super) {
	    __extends(CollectorUntil0, _super);
	    function CollectorUntil0() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.result = false;
	        return _this;
	    }
	    CollectorUntil0.prototype.handleResult = function (result) {
	        this.result = result;
	        return this.result ? true : false;
	    };
	    /**
	     * Get the result of the last signal handler.
	     */
	    CollectorUntil0.prototype.getResult = function () {
	        return this.result;
	    };
	    /**
	     * Reset the result
	     */
	    CollectorUntil0.prototype.reset = function () {
	        this.result = false;
	    };
	    return CollectorUntil0;
	}(Collector));
	exports.CollectorUntil0 = CollectorUntil0;
	/**
	 * Keep signal emissions going while all handlers return false.
	 *
	 * @typeparam CB The function signature to be implemented by handlers.
	 * Return type of CB must be boolean.
	 */
	var CollectorWhile0 = /** @class */ (function (_super) {
	    __extends(CollectorWhile0, _super);
	    function CollectorWhile0() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.result = false;
	        return _this;
	    }
	    CollectorWhile0.prototype.handleResult = function (result) {
	        this.result = result;
	        return this.result ? false : true;
	    };
	    /**
	     * Get the result of the last signal handler.
	     */
	    CollectorWhile0.prototype.getResult = function () {
	        return this.result;
	    };
	    /**
	     * Reset the result
	     */
	    CollectorWhile0.prototype.reset = function () {
	        this.result = false;
	    };
	    return CollectorWhile0;
	}(Collector));
	exports.CollectorWhile0 = CollectorWhile0;
	/**
	 * Returns the result of the all signal handlers from a signal emission in an array.
	 *
	 * @typeparam CB The function signature to be implemented by handlers.
	 * @typeparam RT The return type of CB
	 */
	var CollectorArray = /** @class */ (function (_super) {
	    __extends(CollectorArray, _super);
	    function CollectorArray() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.result = [];
	        return _this;
	    }
	    CollectorArray.prototype.handleResult = function (result) {
	        this.result.push(result);
	        return true;
	    };
	    /**
	     * Get the list of results from the signal handlers.
	     */
	    CollectorArray.prototype.getResult = function () {
	        return this.result;
	    };
	    /**
	     * Reset the result
	     */
	    CollectorArray.prototype.reset = function () {
	        this.result.length = 0;
	    };
	    return CollectorArray;
	}(Collector));
	exports.CollectorArray = CollectorArray;
	//# sourceMappingURL=Signal.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var conversions = __webpack_require__(14);
	var route = __webpack_require__(25);
	
	var convert = {};
	
	var models = Object.keys(conversions);
	
	function wrapRaw(fn) {
		var wrappedFn = function (args) {
			if (args === undefined || args === null) {
				return args;
			}
	
			if (arguments.length > 1) {
				args = Array.prototype.slice.call(arguments);
			}
	
			return fn(args);
		};
	
		// preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}
	
		return wrappedFn;
	}
	
	function wrapRounded(fn) {
		var wrappedFn = function (args) {
			if (args === undefined || args === null) {
				return args;
			}
	
			if (arguments.length > 1) {
				args = Array.prototype.slice.call(arguments);
			}
	
			var result = fn(args);
	
			// we're assuming the result is an array here.
			// see notice in conversions.js; don't use box types
			// in conversion functions.
			if (typeof result === 'object') {
				for (var len = result.length, i = 0; i < len; i++) {
					result[i] = Math.round(result[i]);
				}
			}
	
			return result;
		};
	
		// preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}
	
		return wrappedFn;
	}
	
	models.forEach(function (fromModel) {
		convert[fromModel] = {};
	
		Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
		Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});
	
		var routes = route(fromModel);
		var routeModels = Object.keys(routes);
	
		routeModels.forEach(function (toModel) {
			var fn = routes[toModel];
	
			convert[fromModel][toModel] = wrapRounded(fn);
			convert[fromModel][toModel].raw = wrapRaw(fn);
		});
	});
	
	module.exports = convert;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var conversions = __webpack_require__(14);
	
	/*
		this function routes a model to all other models.
	
		all functions that are routed have a property `.conversion` attached
		to the returned synthetic function. This property is an array
		of strings, each with the steps in between the 'from' and 'to'
		color models (inclusive).
	
		conversions that are not possible simply are not included.
	*/
	
	function buildGraph() {
		var graph = {};
		// https://jsperf.com/object-keys-vs-for-in-with-closure/3
		var models = Object.keys(conversions);
	
		for (var len = models.length, i = 0; i < len; i++) {
			graph[models[i]] = {
				// http://jsperf.com/1-vs-infinity
				// micro-opt, but this is simple.
				distance: -1,
				parent: null
			};
		}
	
		return graph;
	}
	
	// https://en.wikipedia.org/wiki/Breadth-first_search
	function deriveBFS(fromModel) {
		var graph = buildGraph();
		var queue = [fromModel]; // unshift -> queue -> pop
	
		graph[fromModel].distance = 0;
	
		while (queue.length) {
			var current = queue.pop();
			var adjacents = Object.keys(conversions[current]);
	
			for (var len = adjacents.length, i = 0; i < len; i++) {
				var adjacent = adjacents[i];
				var node = graph[adjacent];
	
				if (node.distance === -1) {
					node.distance = graph[current].distance + 1;
					node.parent = current;
					queue.unshift(adjacent);
				}
			}
		}
	
		return graph;
	}
	
	function link(from, to) {
		return function (args) {
			return to(from(args));
		};
	}
	
	function wrapConversion(toModel, graph) {
		var path = [graph[toModel].parent, toModel];
		var fn = conversions[graph[toModel].parent][toModel];
	
		var cur = graph[toModel].parent;
		while (graph[cur].parent) {
			path.unshift(graph[cur].parent);
			fn = link(conversions[graph[cur].parent][cur], fn);
			cur = graph[cur].parent;
		}
	
		fn.conversion = path;
		return fn;
	}
	
	module.exports = function (fromModel) {
		var graph = deriveBFS(fromModel);
		var conversion = {};
	
		var models = Object.keys(graph);
		for (var len = models.length, i = 0; i < len; i++) {
			var toModel = models[i];
			var node = graph[toModel];
	
			if (node.parent === null) {
				// no possible conversion, or this node is the source model.
				continue;
			}
	
			conversion[toModel] = wrapConversion(toModel, graph);
		}
	
		return conversion;
	};
	


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* MIT license */
	var colorNames = __webpack_require__(15);
	var swizzle = __webpack_require__(28);
	
	var reverseNames = {};
	
	// create a list of reverse color names
	for (var name in colorNames) {
		if (colorNames.hasOwnProperty(name)) {
			reverseNames[colorNames[name]] = name;
		}
	}
	
	var cs = module.exports = {
		to: {},
		get: {}
	};
	
	cs.get = function (string) {
		var prefix = string.substring(0, 3).toLowerCase();
		var val;
		var model;
		switch (prefix) {
			case 'hsl':
				val = cs.get.hsl(string);
				model = 'hsl';
				break;
			case 'hwb':
				val = cs.get.hwb(string);
				model = 'hwb';
				break;
			default:
				val = cs.get.rgb(string);
				model = 'rgb';
				break;
		}
	
		if (!val) {
			return null;
		}
	
		return {model: model, value: val};
	};
	
	cs.get.rgb = function (string) {
		if (!string) {
			return null;
		}
	
		var abbr = /^#([a-f0-9]{3,4})$/i;
		var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
		var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
		var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
		var keyword = /(\D+)/;
	
		var rgb = [0, 0, 0, 1];
		var match;
		var i;
		var hexAlpha;
	
		if (match = string.match(hex)) {
			hexAlpha = match[2];
			match = match[1];
	
			for (i = 0; i < 3; i++) {
				// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
				var i2 = i * 2;
				rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
			}
	
			if (hexAlpha) {
				rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
			}
		} else if (match = string.match(abbr)) {
			match = match[1];
			hexAlpha = match[3];
	
			for (i = 0; i < 3; i++) {
				rgb[i] = parseInt(match[i] + match[i], 16);
			}
	
			if (hexAlpha) {
				rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
			}
		} else if (match = string.match(rgba)) {
			for (i = 0; i < 3; i++) {
				rgb[i] = parseInt(match[i + 1], 0);
			}
	
			if (match[4]) {
				rgb[3] = parseFloat(match[4]);
			}
		} else if (match = string.match(per)) {
			for (i = 0; i < 3; i++) {
				rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
			}
	
			if (match[4]) {
				rgb[3] = parseFloat(match[4]);
			}
		} else if (match = string.match(keyword)) {
			if (match[1] === 'transparent') {
				return [0, 0, 0, 0];
			}
	
			rgb = colorNames[match[1]];
	
			if (!rgb) {
				return null;
			}
	
			rgb[3] = 1;
	
			return rgb;
		} else {
			return null;
		}
	
		for (i = 0; i < 3; i++) {
			rgb[i] = clamp(rgb[i], 0, 255);
		}
		rgb[3] = clamp(rgb[3], 0, 1);
	
		return rgb;
	};
	
	cs.get.hsl = function (string) {
		if (!string) {
			return null;
		}
	
		var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
		var match = string.match(hsl);
	
		if (match) {
			var alpha = parseFloat(match[4]);
			var h = (parseFloat(match[1]) + 360) % 360;
			var s = clamp(parseFloat(match[2]), 0, 100);
			var l = clamp(parseFloat(match[3]), 0, 100);
			var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
	
			return [h, s, l, a];
		}
	
		return null;
	};
	
	cs.get.hwb = function (string) {
		if (!string) {
			return null;
		}
	
		var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
		var match = string.match(hwb);
	
		if (match) {
			var alpha = parseFloat(match[4]);
			var h = ((parseFloat(match[1]) % 360) + 360) % 360;
			var w = clamp(parseFloat(match[2]), 0, 100);
			var b = clamp(parseFloat(match[3]), 0, 100);
			var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
			return [h, w, b, a];
		}
	
		return null;
	};
	
	cs.to.hex = function () {
		var rgba = swizzle(arguments);
	
		return (
			'#' +
			hexDouble(rgba[0]) +
			hexDouble(rgba[1]) +
			hexDouble(rgba[2]) +
			(rgba[3] < 1
				? (hexDouble(Math.round(rgba[3] * 255)))
				: '')
		);
	};
	
	cs.to.rgb = function () {
		var rgba = swizzle(arguments);
	
		return rgba.length < 4 || rgba[3] === 1
			? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
			: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
	};
	
	cs.to.rgb.percent = function () {
		var rgba = swizzle(arguments);
	
		var r = Math.round(rgba[0] / 255 * 100);
		var g = Math.round(rgba[1] / 255 * 100);
		var b = Math.round(rgba[2] / 255 * 100);
	
		return rgba.length < 4 || rgba[3] === 1
			? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
			: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
	};
	
	cs.to.hsl = function () {
		var hsla = swizzle(arguments);
		return hsla.length < 4 || hsla[3] === 1
			? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
			: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
	};
	
	// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
	// (hwb have alpha optional & 1 is default value)
	cs.to.hwb = function () {
		var hwba = swizzle(arguments);
	
		var a = '';
		if (hwba.length >= 4 && hwba[3] !== 1) {
			a = ', ' + hwba[3];
		}
	
		return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
	};
	
	cs.to.keyword = function (rgb) {
		return reverseNames[rgb.slice(0, 3)];
	};
	
	// helpers
	function clamp(num, min, max) {
		return Math.min(Math.max(min, num), max);
	}
	
	function hexDouble(num) {
		var str = num.toString(16).toUpperCase();
		return (str.length < 2) ? '0' + str : str;
	}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var colorString = __webpack_require__(26);
	var convert = __webpack_require__(24);
	
	var _slice = [].slice;
	
	var skippedModels = [
		// to be honest, I don't really feel like keyword belongs in color convert, but eh.
		'keyword',
	
		// gray conflicts with some method names, and has its own method defined.
		'gray',
	
		// shouldn't really be in color-convert either...
		'hex'
	];
	
	var hashedModelKeys = {};
	Object.keys(convert).forEach(function (model) {
		hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
	});
	
	var limiters = {};
	
	function Color(obj, model) {
		if (!(this instanceof Color)) {
			return new Color(obj, model);
		}
	
		if (model && model in skippedModels) {
			model = null;
		}
	
		if (model && !(model in convert)) {
			throw new Error('Unknown model: ' + model);
		}
	
		var i;
		var channels;
	
		if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
			this.model = 'rgb';
			this.color = [0, 0, 0];
			this.valpha = 1;
		} else if (obj instanceof Color) {
			this.model = obj.model;
			this.color = obj.color.slice();
			this.valpha = obj.valpha;
		} else if (typeof obj === 'string') {
			var result = colorString.get(obj);
			if (result === null) {
				throw new Error('Unable to parse color from string: ' + obj);
			}
	
			this.model = result.model;
			channels = convert[this.model].channels;
			this.color = result.value.slice(0, channels);
			this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
		} else if (obj.length) {
			this.model = model || 'rgb';
			channels = convert[this.model].channels;
			var newArr = _slice.call(obj, 0, channels);
			this.color = zeroArray(newArr, channels);
			this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
		} else if (typeof obj === 'number') {
			// this is always RGB - can be converted later on.
			obj &= 0xFFFFFF;
			this.model = 'rgb';
			this.color = [
				(obj >> 16) & 0xFF,
				(obj >> 8) & 0xFF,
				obj & 0xFF
			];
			this.valpha = 1;
		} else {
			this.valpha = 1;
	
			var keys = Object.keys(obj);
			if ('alpha' in obj) {
				keys.splice(keys.indexOf('alpha'), 1);
				this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
			}
	
			var hashedKeys = keys.sort().join('');
			if (!(hashedKeys in hashedModelKeys)) {
				throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
			}
	
			this.model = hashedModelKeys[hashedKeys];
	
			var labels = convert[this.model].labels;
			var color = [];
			for (i = 0; i < labels.length; i++) {
				color.push(obj[labels[i]]);
			}
	
			this.color = zeroArray(color);
		}
	
		// perform limitations (clamping, etc.)
		if (limiters[this.model]) {
			channels = convert[this.model].channels;
			for (i = 0; i < channels; i++) {
				var limit = limiters[this.model][i];
				if (limit) {
					this.color[i] = limit(this.color[i]);
				}
			}
		}
	
		this.valpha = Math.max(0, Math.min(1, this.valpha));
	
		if (Object.freeze) {
			Object.freeze(this);
		}
	}
	
	Color.prototype = {
		toString: function () {
			return this.string();
		},
	
		toJSON: function () {
			return this[this.model]();
		},
	
		string: function (places) {
			var self = this.model in colorString.to ? this : this.rgb();
			self = self.round(typeof places === 'number' ? places : 1);
			var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
			return colorString.to[self.model](args);
		},
	
		percentString: function (places) {
			var self = this.rgb().round(typeof places === 'number' ? places : 1);
			var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
			return colorString.to.rgb.percent(args);
		},
	
		array: function () {
			return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
		},
	
		object: function () {
			var result = {};
			var channels = convert[this.model].channels;
			var labels = convert[this.model].labels;
	
			for (var i = 0; i < channels; i++) {
				result[labels[i]] = this.color[i];
			}
	
			if (this.valpha !== 1) {
				result.alpha = this.valpha;
			}
	
			return result;
		},
	
		unitArray: function () {
			var rgb = this.rgb().color;
			rgb[0] /= 255;
			rgb[1] /= 255;
			rgb[2] /= 255;
	
			if (this.valpha !== 1) {
				rgb.push(this.valpha);
			}
	
			return rgb;
		},
	
		unitObject: function () {
			var rgb = this.rgb().object();
			rgb.r /= 255;
			rgb.g /= 255;
			rgb.b /= 255;
	
			if (this.valpha !== 1) {
				rgb.alpha = this.valpha;
			}
	
			return rgb;
		},
	
		round: function (places) {
			places = Math.max(places || 0, 0);
			return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
		},
	
		alpha: function (val) {
			if (arguments.length) {
				return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
			}
	
			return this.valpha;
		},
	
		// rgb
		red: getset('rgb', 0, maxfn(255)),
		green: getset('rgb', 1, maxfn(255)),
		blue: getset('rgb', 2, maxfn(255)),
	
		hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style
	
		saturationl: getset('hsl', 1, maxfn(100)),
		lightness: getset('hsl', 2, maxfn(100)),
	
		saturationv: getset('hsv', 1, maxfn(100)),
		value: getset('hsv', 2, maxfn(100)),
	
		chroma: getset('hcg', 1, maxfn(100)),
		gray: getset('hcg', 2, maxfn(100)),
	
		white: getset('hwb', 1, maxfn(100)),
		wblack: getset('hwb', 2, maxfn(100)),
	
		cyan: getset('cmyk', 0, maxfn(100)),
		magenta: getset('cmyk', 1, maxfn(100)),
		yellow: getset('cmyk', 2, maxfn(100)),
		black: getset('cmyk', 3, maxfn(100)),
	
		x: getset('xyz', 0, maxfn(100)),
		y: getset('xyz', 1, maxfn(100)),
		z: getset('xyz', 2, maxfn(100)),
	
		l: getset('lab', 0, maxfn(100)),
		a: getset('lab', 1),
		b: getset('lab', 2),
	
		keyword: function (val) {
			if (arguments.length) {
				return new Color(val);
			}
	
			return convert[this.model].keyword(this.color);
		},
	
		hex: function (val) {
			if (arguments.length) {
				return new Color(val);
			}
	
			return colorString.to.hex(this.rgb().round().color);
		},
	
		rgbNumber: function () {
			var rgb = this.rgb().color;
			return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
		},
	
		luminosity: function () {
			// http://www.w3.org/TR/WCAG20/#relativeluminancedef
			var rgb = this.rgb().color;
	
			var lum = [];
			for (var i = 0; i < rgb.length; i++) {
				var chan = rgb[i] / 255;
				lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
			}
	
			return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
		},
	
		contrast: function (color2) {
			// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
			var lum1 = this.luminosity();
			var lum2 = color2.luminosity();
	
			if (lum1 > lum2) {
				return (lum1 + 0.05) / (lum2 + 0.05);
			}
	
			return (lum2 + 0.05) / (lum1 + 0.05);
		},
	
		level: function (color2) {
			var contrastRatio = this.contrast(color2);
			if (contrastRatio >= 7.1) {
				return 'AAA';
			}
	
			return (contrastRatio >= 4.5) ? 'AA' : '';
		},
	
		isDark: function () {
			// YIQ equation from http://24ways.org/2010/calculating-color-contrast
			var rgb = this.rgb().color;
			var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
			return yiq < 128;
		},
	
		isLight: function () {
			return !this.isDark();
		},
	
		negate: function () {
			var rgb = this.rgb();
			for (var i = 0; i < 3; i++) {
				rgb.color[i] = 255 - rgb.color[i];
			}
			return rgb;
		},
	
		lighten: function (ratio) {
			var hsl = this.hsl();
			hsl.color[2] += hsl.color[2] * ratio;
			return hsl;
		},
	
		darken: function (ratio) {
			var hsl = this.hsl();
			hsl.color[2] -= hsl.color[2] * ratio;
			return hsl;
		},
	
		saturate: function (ratio) {
			var hsl = this.hsl();
			hsl.color[1] += hsl.color[1] * ratio;
			return hsl;
		},
	
		desaturate: function (ratio) {
			var hsl = this.hsl();
			hsl.color[1] -= hsl.color[1] * ratio;
			return hsl;
		},
	
		whiten: function (ratio) {
			var hwb = this.hwb();
			hwb.color[1] += hwb.color[1] * ratio;
			return hwb;
		},
	
		blacken: function (ratio) {
			var hwb = this.hwb();
			hwb.color[2] += hwb.color[2] * ratio;
			return hwb;
		},
	
		grayscale: function () {
			// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
			var rgb = this.rgb().color;
			var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
			return Color.rgb(val, val, val);
		},
	
		fade: function (ratio) {
			return this.alpha(this.valpha - (this.valpha * ratio));
		},
	
		opaquer: function (ratio) {
			return this.alpha(this.valpha + (this.valpha * ratio));
		},
	
		rotate: function (degrees) {
			var hsl = this.hsl();
			var hue = hsl.color[0];
			hue = (hue + degrees) % 360;
			hue = hue < 0 ? 360 + hue : hue;
			hsl.color[0] = hue;
			return hsl;
		},
	
		mix: function (mixinColor, weight) {
			// ported from sass implementation in C
			// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
			if (!mixinColor || !mixinColor.rgb) {
				throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
			}
			var color1 = mixinColor.rgb();
			var color2 = this.rgb();
			var p = weight === undefined ? 0.5 : weight;
	
			var w = 2 * p - 1;
			var a = color1.alpha() - color2.alpha();
	
			var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
			var w2 = 1 - w1;
	
			return Color.rgb(
					w1 * color1.red() + w2 * color2.red(),
					w1 * color1.green() + w2 * color2.green(),
					w1 * color1.blue() + w2 * color2.blue(),
					color1.alpha() * p + color2.alpha() * (1 - p));
		}
	};
	
	// model conversion methods and static constructors
	Object.keys(convert).forEach(function (model) {
		if (skippedModels.indexOf(model) !== -1) {
			return;
		}
	
		var channels = convert[model].channels;
	
		// conversion methods
		Color.prototype[model] = function () {
			if (this.model === model) {
				return new Color(this);
			}
	
			if (arguments.length) {
				return new Color(arguments, model);
			}
	
			var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
			return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
		};
	
		// 'static' construction methods
		Color[model] = function (color) {
			if (typeof color === 'number') {
				color = zeroArray(_slice.call(arguments), channels);
			}
			return new Color(color, model);
		};
	});
	
	function roundTo(num, places) {
		return Number(num.toFixed(places));
	}
	
	function roundToPlace(places) {
		return function (num) {
			return roundTo(num, places);
		};
	}
	
	function getset(model, channel, modifier) {
		model = Array.isArray(model) ? model : [model];
	
		model.forEach(function (m) {
			(limiters[m] || (limiters[m] = []))[channel] = modifier;
		});
	
		model = model[0];
	
		return function (val) {
			var result;
	
			if (arguments.length) {
				if (modifier) {
					val = modifier(val);
				}
	
				result = this[model]();
				result.color[channel] = val;
				return result;
			}
	
			result = this[model]().color[channel];
			if (modifier) {
				result = modifier(result);
			}
	
			return result;
		};
	}
	
	function maxfn(max) {
		return function (v) {
			return Math.max(0, Math.min(max, v));
		};
	}
	
	function assertArray(val) {
		return Array.isArray(val) ? val : [val];
	}
	
	function zeroArray(arr, length) {
		for (var i = 0; i < length; i++) {
			if (typeof arr[i] !== 'number') {
				arr[i] = 0;
			}
		}
	
		return arr;
	}
	
	module.exports = Color;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArrayish = __webpack_require__(29);
	
	var concat = Array.prototype.concat;
	var slice = Array.prototype.slice;
	
	var swizzle = module.exports = function swizzle(args) {
		var results = [];
	
		for (var i = 0, len = args.length; i < len; i++) {
			var arg = args[i];
	
			if (isArrayish(arg)) {
				// http://jsperf.com/javascript-array-concat-vs-push/98
				results = concat.call(results, slice.call(arg));
			} else {
				results.push(arg);
			}
		}
	
		return results;
	};
	
	swizzle.wrap = function (fn) {
		return function () {
			return fn(swizzle(arguments));
		};
	};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = function isArrayish(obj) {
		if (!obj || typeof obj === 'string') {
			return false;
		}
	
		return obj instanceof Array || Array.isArray(obj) ||
			(obj.length >= 0 && (obj.splice instanceof Function ||
				(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
	};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function switchHtmlLayer(layers, layerToActivate) {
	    let isMadeVisible = false;
	    for (let [key, layer] of layers.entries()) {
	        if (key === layerToActivate) {
	            if (layer.classList.contains('hiddenLayer')) {
	                layer.classList.remove('hiddenLayer');
	                isMadeVisible = true;
	            }
	        }
	        else {
	            if (!layer.classList.contains('hiddenLayer')) {
	                layer.classList.add('hiddenLayer');
	            }
	        }
	    }
	    return isMadeVisible;
	}
	exports.switchHtmlLayer = switchHtmlLayer;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	class PlayField {
	    constructor(width, height) {
	        this._usedCellCount = 0;
	        this.width = Math.trunc(width);
	        this.height = Math.trunc(height);
	        let size = this.width * this.height;
	        this._data = new Array(size);
	        while (size--) {
	            this._data[size] = { entityIds: [] };
	        }
	    }
	    getCell(pos) {
	        return this._data[this.width * pos.y + pos.x];
	    }
	    insertEntity(pos, id) {
	        const cell = this.getCell(pos);
	        if (!cell.entityIds.includes(id)) {
	            if (cell.entityIds.length == 0) {
	                ++this._usedCellCount;
	            }
	            cell.entityIds.push(id);
	        }
	    }
	    removeEntity(pos, id) {
	        const cell = this.getCell(pos);
	        const index = cell.entityIds.indexOf(id);
	        if (index >= 0) {
	            cell.entityIds.splice(index, 1);
	            if (cell.entityIds.length == 0) {
	                --this._usedCellCount;
	            }
	        }
	    }
	    get usedCellCount() { return this._usedCellCount; }
	}
	exports.PlayField = PlayField;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const PlayField_1 = __webpack_require__(31);
	const SnakeFactory_1 = __webpack_require__(19);
	const GameStateSystem_1 = __webpack_require__(37);
	const MovementInputSystem_1 = __webpack_require__(38);
	const SnakeMovementSystem_1 = __webpack_require__(41);
	const FoodDispenserSystem_1 = __webpack_require__(35);
	const EatingSystem_1 = __webpack_require__(34);
	const ObstacleGeneratorSystem_1 = __webpack_require__(39);
	const SnakeCollisionSystem_1 = __webpack_require__(40);
	const ClearRenderSystem_1 = __webpack_require__(33);
	const SnakeRenderSystem_1 = __webpack_require__(42);
	const FoodRenderSystem_1 = __webpack_require__(36);
	const WallRenderSystem_1 = __webpack_require__(43);
	const GameGui_1 = __webpack_require__(16);
	const DirectionComponent_1 = __webpack_require__(7);
	//-------------------------------------------------------------------------------------------------------------------
	function startGame(canvas, gui) {
	    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
	    const playFieldWidth = 64; // should be divisable by aspectRatio
	    const game = {
	        status: GameStateSystem_1.GameStatus.Playing,
	        ecs: new typed_ecstasy_1.Engine(),
	        ctx: canvas.getContext('2d'),
	        playField: new PlayField_1.PlayField(playFieldWidth, playFieldWidth / aspectRatio),
	        gui: gui,
	        interval: 0.3,
	        progress: { score: 0 }
	    };
	    SnakeFactory_1.createAndAddSnake(game.ecs, game.playField, { x: game.playField.width / 2, y: game.playField.height / 2 }, Math.random() > 0.5 ? DirectionComponent_1.Direction.left : DirectionComponent_1.Direction.right);
	    game.ecs.addSystem(new ObstacleGeneratorSystem_1.ObstacleGeneratorSystem(game));
	    game.ecs.addSystem(new MovementInputSystem_1.MovementInputSystem(game));
	    game.ecs.addSystem(new SnakeMovementSystem_1.SnakeMovementSystem(game.playField, game.interval));
	    game.ecs.addSystem(new FoodDispenserSystem_1.FoodDispenserSystem(game.playField, 500, game.interval));
	    game.ecs.addSystem(new EatingSystem_1.EatingSystem(game.playField, game.progress, game.interval));
	    game.ecs.addSystem(new SnakeCollisionSystem_1.CollisionSystem(game.playField, game.interval));
	    game.ecs.addSystem(new ClearRenderSystem_1.ClearRenderSystem(game.ctx, game.interval));
	    game.ecs.addSystem(new FoodRenderSystem_1.FoodRenderSystem(game.ctx, game.playField, game.interval));
	    game.ecs.addSystem(new WallRenderSystem_1.WallRenderSystem(game.ctx, game.playField, game.interval));
	    game.ecs.addSystem(new SnakeRenderSystem_1.SnakeRenderSystem(game.ctx, game.playField, game.interval));
	    game.ecs.addSystem(new GameStateSystem_1.GameStateSystem(game, game.interval));
	    gameLoop(game);
	}
	exports.startGame = startGame;
	//-------------------------------------------------------------------------------------------------------------------
	function gameLoop(game, lastTime = 0) {
	    if (game.status === GameStateSystem_1.GameStatus.GameOver) {
	        console.log("SCORE: ", game.progress.score);
	        document.getElementById('score').innerText = game.progress.score.toString();
	        GameGui_1.switchHtmlLayer(game.gui, GameGui_1.GameLayerId.GameOver);
	        return;
	    }
	    const time = performance.now() / 1000;
	    if (lastTime > 0) {
	        game.ecs.update(time - lastTime); // Update all systems
	    }
	    requestAnimationFrame(() => gameLoop(game, time));
	}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	//---------------------------------------------------------------------------------------------------------------------
	class ClearRenderSystem extends typed_ecstasy_1.IntervalSystem {
	    constructor(_ctx, interval) {
	        super(interval);
	        this._ctx = _ctx;
	    }
	    updateInterval() {
	        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
	    }
	}
	exports.ClearRenderSystem = ClearRenderSystem;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const PositionComponent_1 = __webpack_require__(2);
	const FeedableComponent_1 = __webpack_require__(9);
	const FoodComponents_1 = __webpack_require__(10);
	//---------------------------------------------------------------------------------------------------------------------
	class EatingSystem extends typed_ecstasy_1.IntervalIteratingSystem {
	    constructor(_playField, _progress, interval) {
	        super(typed_ecstasy_1.Family.all(PositionComponent_1.PositionComponent, FeedableComponent_1.FeedableComponent).get(), interval);
	        this._playField = _playField;
	        this._progress = _progress;
	    }
	    //.................................................................................................................
	    processEntity(entity) {
	        const ecs = this.getEngine();
	        const position = entity.get(PositionComponent_1.PositionComponent);
	        const cell = this._playField.getCell(position);
	        for (const cellEntityId of cell.entityIds) {
	            const cellEntity = ecs.getEntity(cellEntityId);
	            if (cellEntity) {
	                // Check if cell has food
	                const nutrition = cellEntity.get(FoodComponents_1.NutritionComponent);
	                if (nutrition) {
	                    // Feed it to the Feedable
	                    const feedable = entity.get(FeedableComponent_1.FeedableComponent);
	                    feedable.stomach += nutrition.value;
	                    this._progress.score += nutrition.value;
	                    // Remove the food entity
	                    this._playField.removeEntity(position, cellEntityId);
	                    ecs.removeEntity(cellEntity);
	                }
	            }
	        }
	    }
	}
	exports.EatingSystem = EatingSystem;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const PositionComponent_1 = __webpack_require__(2);
	const FoodComponents_1 = __webpack_require__(10);
	const SetEntityPosition_1 = __webpack_require__(6);
	//---------------------------------------------------------------------------------------------------------------------
	class FoodDispenserSystem extends typed_ecstasy_1.IntervalSystem {
	    constructor(_playField, _foodCount, interval) {
	        super(interval);
	        this._playField = _playField;
	        this._foodCount = _foodCount;
	        this._foodEntities = [];
	    }
	    addedToEngine(engine) {
	        super.addedToEngine(engine);
	        this._foodEntities = engine.getEntitiesFor(typed_ecstasy_1.Family.all(FoodComponents_1.NutritionComponent).get());
	        this.updateInterval();
	    }
	    updateInterval() {
	        let missingEntityCount = this._foodCount - this._foodEntities.length;
	        while (missingEntityCount-- > 0) {
	            const ecs = this.getEngine();
	            const entity = ecs.createEntity();
	            entity.add(new PositionComponent_1.PositionComponent);
	            entity.add(new FoodComponents_1.NutritionComponent(Math.trunc(1 + Math.random() * 5)));
	            ecs.addEntity(entity);
	            // TODO: find empty playfield cell
	            const x = Math.trunc(Math.random() * this._playField.width);
	            const y = Math.trunc(Math.random() * this._playField.height);
	            SetEntityPosition_1.setEntityPosition(this._playField, entity, { x: x, y: y });
	        }
	    }
	}
	exports.FoodDispenserSystem = FoodDispenserSystem;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const PositionComponent_1 = __webpack_require__(2);
	const FoodComponents_1 = __webpack_require__(10);
	//---------------------------------------------------------------------------------------------------------------------
	class FoodRenderSystem extends typed_ecstasy_1.IntervalIteratingSystem {
	    constructor(_ctx, _playField, interval) {
	        super(typed_ecstasy_1.Family.all(PositionComponent_1.PositionComponent, FoodComponents_1.NutritionComponent).get(), interval);
	        this._ctx = _ctx;
	        this._playField = _playField;
	    }
	    processEntity(entity) {
	        const pos = entity.get(PositionComponent_1.PositionComponent);
	        const nutrition = entity.get(FoodComponents_1.NutritionComponent);
	        const x = (pos.x + 0.5) / this._playField.width * this._ctx.canvas.width;
	        const y = (pos.y + 0.5) / this._playField.height * this._ctx.canvas.height;
	        const w = this._ctx.canvas.width / this._playField.width;
	        const h = this._ctx.canvas.height / this._playField.height;
	        const scale = 0.075 + 0.15 * nutrition.value / 5;
	        this._ctx.beginPath();
	        this._ctx.moveTo(x - w * scale, y);
	        this._ctx.lineTo(x + w * scale, y);
	        this._ctx.moveTo(x, y - h * scale);
	        this._ctx.lineTo(x, y + h * scale);
	        this._ctx.strokeStyle = "#3fe03f";
	        this._ctx.stroke();
	    }
	}
	exports.FoodRenderSystem = FoodRenderSystem;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const SnakeHeadComponent_1 = __webpack_require__(3);
	//---------------------------------------------------------------------------------------------------------------------
	var GameStatus;
	(function (GameStatus) {
	    GameStatus[GameStatus["Playing"] = 0] = "Playing";
	    GameStatus[GameStatus["GameOver"] = 1] = "GameOver";
	})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));
	//---------------------------------------------------------------------------------------------------------------------
	class GameStateSystem extends typed_ecstasy_1.IntervalSystem {
	    constructor(_state, interval) {
	        super(interval);
	        this._state = _state;
	        this._entities = [];
	    }
	    addedToEngine(engine) {
	        super.addedToEngine(engine);
	        this._entities = engine.getEntitiesFor(typed_ecstasy_1.Family.all(SnakeHeadComponent_1.SnakeHeadComponent).get());
	    }
	    updateInterval() {
	        const headsAlive = this._entities.filter((entity) => entity.get(SnakeHeadComponent_1.SnakeHeadComponent).isAlive);
	        if (headsAlive.length === 0) {
	            this._state.status = GameStatus.GameOver;
	        }
	    }
	}
	exports.GameStateSystem = GameStateSystem;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const DirectionComponent_1 = __webpack_require__(7);
	//---------------------------------------------------------------------------------------------------------------------
	class MovementInputSystem extends typed_ecstasy_1.IntervalIteratingSystem {
	    constructor(state) {
	        super(typed_ecstasy_1.Family.all(DirectionComponent_1.RequestedDirectionComponent).get(), state.interval);
	        this._inputDirection = DirectionComponent_1.Direction.none;
	        document.addEventListener("keydown", (event) => {
	            switch (event.keyCode) {
	                case 37: // left
	                    this._inputDirection = DirectionComponent_1.Direction.left;
	                    break;
	                case 38: // up
	                    this._inputDirection = DirectionComponent_1.Direction.up;
	                    break;
	                case 39: // right
	                    this._inputDirection = DirectionComponent_1.Direction.right;
	                    break;
	                case 40: // down
	                    this._inputDirection = DirectionComponent_1.Direction.down;
	                    break;
	            }
	        });
	    }
	    processEntity(entity) {
	        const direction = entity.get(DirectionComponent_1.RequestedDirectionComponent);
	        direction.value = this._inputDirection;
	    }
	}
	exports.MovementInputSystem = MovementInputSystem;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const ObstacleComponent_1 = __webpack_require__(11);
	const WallComponent_1 = __webpack_require__(18);
	const PositionComponent_1 = __webpack_require__(2);
	const SetEntityPosition_1 = __webpack_require__(6);
	//---------------------------------------------------------------------------------------------------------------------
	class ObstacleGeneratorSystem extends typed_ecstasy_1.EntitySystem {
	    constructor(_state) {
	        super(0);
	        this._state = _state;
	    }
	    addedToEngine(engine) {
	        super.addedToEngine(engine);
	    }
	    update(deltaTime) {
	        // Create walls around playfield
	        this.createWalls();
	        // No further calls to update() required
	        this.setProcessing(false);
	    }
	    createWalls() {
	        for (let x = 0; x < this._state.playField.width; ++x) {
	            this.createObstacle(x, 0);
	            this.createObstacle(x, this._state.playField.height - 1);
	        }
	        for (let y = 1; y < this._state.playField.height - 1; ++y) {
	            this.createObstacle(0, y);
	            this.createObstacle(this._state.playField.width - 1, y);
	        }
	    }
	    createObstacle(x, y) {
	        const ecs = this.getEngine();
	        const entity = ecs.createEntity();
	        entity.add(new PositionComponent_1.PositionComponent);
	        entity.add(new ObstacleComponent_1.ObstacleComponent);
	        entity.add(new WallComponent_1.WallComponent);
	        ecs.addEntity(entity);
	        SetEntityPosition_1.setEntityPosition(this._state.playField, entity, { x: x, y: y });
	    }
	}
	exports.ObstacleGeneratorSystem = ObstacleGeneratorSystem;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const PositionComponent_1 = __webpack_require__(2);
	const SnakeHeadComponent_1 = __webpack_require__(3);
	const ObstacleComponent_1 = __webpack_require__(11);
	//---------------------------------------------------------------------------------------------------------------------
	class CollisionSystem extends typed_ecstasy_1.IntervalIteratingSystem {
	    constructor(_playField, interval) {
	        super(typed_ecstasy_1.Family.all(PositionComponent_1.PositionComponent, SnakeHeadComponent_1.SnakeHeadComponent).get(), interval);
	        this._playField = _playField;
	    }
	    processEntity(entity) {
	        const ecs = this.getEngine();
	        const position = entity.get(PositionComponent_1.PositionComponent);
	        const cell = this._playField.getCell(position);
	        for (let cellEntityId of cell.entityIds) {
	            const cellEntity = ecs.getEntity(cellEntityId);
	            if (cellEntity.get(ObstacleComponent_1.ObstacleComponent)) {
	                const snakeHead = entity.get(SnakeHeadComponent_1.SnakeHeadComponent);
	                snakeHead.isAlive = false;
	                break;
	            }
	        }
	    }
	}
	exports.CollisionSystem = CollisionSystem;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const PositionComponent_1 = __webpack_require__(2);
	const DirectionComponent_1 = __webpack_require__(7);
	const SnakeHeadComponent_1 = __webpack_require__(3);
	const DoubleLinkComponent_1 = __webpack_require__(8);
	const FeedableComponent_1 = __webpack_require__(9);
	const SnakeFactory_1 = __webpack_require__(19);
	const SetEntityPosition_1 = __webpack_require__(6);
	const Vector_1 = __webpack_require__(17);
	//---------------------------------------------------------------------------------------------------------------------
	class SnakeMovementSystem extends typed_ecstasy_1.IntervalIteratingSystem {
	    constructor(_playField, interval) {
	        super(typed_ecstasy_1.Family.all(SnakeHeadComponent_1.SnakeHeadComponent, PositionComponent_1.PositionComponent, DoubleLinkComponent_1.DoubleLinkComponent, DirectionComponent_1.DirectionComponent, DirectionComponent_1.RequestedDirectionComponent, FeedableComponent_1.FeedableComponent).get(), interval);
	        this._playField = _playField;
	    }
	    //.................................................................................................................
	    processEntity(entity) {
	        // Move snake by removing tail and inserting it in front of current head, incrementing position
	        // based on DirectionComponent.
	        const ecs = this.getEngine();
	        // Get snake head components
	        const headComp = entity.get(SnakeHeadComponent_1.SnakeHeadComponent);
	        if (!headComp.isAlive) {
	            return;
	        }
	        const headPos = entity.get(PositionComponent_1.PositionComponent);
	        const direction = entity.get(DirectionComponent_1.DirectionComponent);
	        const requestedDirection = entity.get(DirectionComponent_1.RequestedDirectionComponent);
	        const feedable = entity.get(FeedableComponent_1.FeedableComponent);
	        let newSegment;
	        if (feedable.stomach > 0) {
	            // Snake has eaten something -> insert a new segment.
	            newSegment = SnakeFactory_1.createSnakeSegment(ecs, this._playField);
	            ++headComp.length;
	            --feedable.stomach;
	        }
	        else {
	            // Snake has not eaten -> keep its length, just move the current tail behind the head.
	            const currentTail = ecs.getEntity(headComp.tailId);
	            const newTail = DoubleLinkComponent_1.removeLastEntityFromDoubleLinkedList(ecs, currentTail);
	            // Make head point to new tail.
	            headComp.tailId = newTail.getId();
	            newSegment = currentTail;
	        }
	        // Insert new segment behind head.
	        DoubleLinkComponent_1.insertEntityInDoubleLinkedList(ecs, newSegment, entity);
	        // Set position of new segment to current position of head.
	        SetEntityPosition_1.setEntityPosition(this._playField, newSegment, headPos);
	        // Update position of head.
	        const directionVec = this.changeDirection(requestedDirection, direction);
	        SetEntityPosition_1.setEntityPosition(this._playField, entity, Vector_1.vec2add(headPos, directionVec));
	    }
	    //.................................................................................................................
	    changeDirection(requestedDirection, direction) {
	        switch (requestedDirection.value) {
	            case DirectionComponent_1.Direction.left:
	                if (direction.value != DirectionComponent_1.Direction.right)
	                    direction.value = requestedDirection.value;
	                break;
	            case DirectionComponent_1.Direction.right:
	                if (direction.value != DirectionComponent_1.Direction.left)
	                    direction.value = requestedDirection.value;
	                break;
	            case DirectionComponent_1.Direction.up:
	                if (direction.value != DirectionComponent_1.Direction.down)
	                    direction.value = requestedDirection.value;
	                break;
	            case DirectionComponent_1.Direction.down:
	                if (direction.value != DirectionComponent_1.Direction.up)
	                    direction.value = requestedDirection.value;
	                break;
	        }
	        return DirectionComponent_1.directionToVec2(direction.value);
	    }
	}
	exports.SnakeMovementSystem = SnakeMovementSystem;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const PositionComponent_1 = __webpack_require__(2);
	const DoubleLinkComponent_1 = __webpack_require__(8);
	const SnakeHeadComponent_1 = __webpack_require__(3);
	const Color = __webpack_require__(27);
	//---------------------------------------------------------------------------------------------------------------------
	class SnakeRenderSystem extends typed_ecstasy_1.IntervalSystem {
	    constructor(_ctx, _playField, interval) {
	        super(interval);
	        this._ctx = _ctx;
	        this._playField = _playField;
	        this._entities = [];
	    }
	    addedToEngine(engine) {
	        super.addedToEngine(engine);
	        this._entities = engine.getEntitiesFor(typed_ecstasy_1.Family.all(PositionComponent_1.PositionComponent, SnakeHeadComponent_1.SnakeHeadComponent, DoubleLinkComponent_1.DoubleLinkComponent).get());
	    }
	    updateInterval() {
	        const ecs = this.getEngine();
	        const ctx = this._ctx;
	        const w = ctx.canvas.width / this._playField.width;
	        const h = ctx.canvas.height / this._playField.height;
	        const radius = 0.40 * w;
	        const radius2 = 0.25 * w;
	        const startColor = Color("#FFEF00");
	        const endColor = Color("#FF3F00");
	        ctx.lineWidth = 1.5;
	        // Draw all snakes
	        for (const headEntity of this._entities) {
	            // Draw headEntity
	            const headPos = headEntity.get(PositionComponent_1.PositionComponent);
	            const headComp = headEntity.get(SnakeHeadComponent_1.SnakeHeadComponent);
	            const headLink = headEntity.get(DoubleLinkComponent_1.DoubleLinkComponent);
	            const { x, y } = this.entityToCanvasPos(headPos);
	            ctx.strokeStyle = startColor.hsl().string();
	            ctx.beginPath();
	            ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
	            ctx.stroke();
	            ctx.beginPath();
	            ctx.ellipse(x, y, radius2, radius2, 0, 0, Math.PI * 2);
	            ctx.stroke();
	            // Draw remaining segments
	            let iSeg = 1;
	            let segId = headLink.prevId;
	            while (segId !== null) {
	                const segmentEntity = ecs.getEntity(segId);
	                const segPos = segmentEntity.get(PositionComponent_1.PositionComponent);
	                const segLink = segmentEntity.get(DoubleLinkComponent_1.DoubleLinkComponent);
	                const { x, y } = this.entityToCanvasPos(segPos);
	                const color = startColor.mix(endColor, iSeg / headComp.length);
	                ctx.strokeStyle = color.hsl().string();
	                ctx.beginPath();
	                ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
	                ctx.stroke();
	                segId = segLink.prevId;
	                ++iSeg;
	            }
	        }
	    }
	    entityToCanvasPos(pos) {
	        const x = (pos.x + 0.5) / this._playField.width * this._ctx.canvas.width;
	        const y = (pos.y + 0.5) / this._playField.height * this._ctx.canvas.height;
	        return { x: x, y: y };
	    }
	}
	exports.SnakeRenderSystem = SnakeRenderSystem;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const typed_ecstasy_1 = __webpack_require__(1);
	const PositionComponent_1 = __webpack_require__(2);
	const WallComponent_1 = __webpack_require__(18);
	//---------------------------------------------------------------------------------------------------------------------
	class WallRenderSystem extends typed_ecstasy_1.IntervalIteratingSystem {
	    constructor(_ctx, _playField, interval) {
	        super(typed_ecstasy_1.Family.all(PositionComponent_1.PositionComponent, WallComponent_1.WallComponent).get(), interval);
	        this._ctx = _ctx;
	        this._playField = _playField;
	    }
	    processEntity(entity) {
	        const ecs = this.getEngine();
	        const ctx = this._ctx;
	        const w = ctx.canvas.width / this._playField.width;
	        const h = ctx.canvas.height / this._playField.height;
	        const obstacleSize = 0.9 * w;
	        const pos = entity.get(PositionComponent_1.PositionComponent);
	        const { x, y } = this.entityToCanvasPos(pos);
	        ctx.fillStyle = "#666666";
	        ctx.fillRect(x - obstacleSize / 2, y - obstacleSize / 2, obstacleSize, obstacleSize);
	    }
	    entityToCanvasPos(pos) {
	        const x = (pos.x + 0.5) / this._playField.width * this._ctx.canvas.width;
	        const y = (pos.y + 0.5) / this._playField.height * this._ctx.canvas.height;
	        return { x: x, y: y };
	    }
	}
	exports.WallRenderSystem = WallRenderSystem;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	const wutil = __webpack_require__(45);
	const startGame_1 = __webpack_require__(32);
	const GameGui_1 = __webpack_require__(16);
	//-------------------------------------------------------------------------------------------------------------------
	function main() {
	    const gameCanvas = document.getElementById('gameCanvas');
	    const menuScreen = document.getElementById('menuScreen');
	    const gameOverScreen = document.getElementById('gameOverScreen');
	    const gui = new Map([
	        [GameGui_1.GameLayerId.Game, gameCanvas],
	        [GameGui_1.GameLayerId.Menu, menuScreen],
	        [GameGui_1.GameLayerId.GameOver, gameOverScreen],
	    ]);
	    wutil.resizeCanvasPixelBuffer(gameCanvas);
	    wireUpEventListeners(gameCanvas, gui);
	}
	//-------------------------------------------------------------------------------------------------------------------
	function wireUpEventListeners(gameCanvas, gui) {
	    // On window resize, resize the canvas to fill browser window dynamically.
	    // Use debounce() to avoid costly calculations while the window size is in flux.
	    window.addEventListener("resize", () => wutil.resizeCanvasPixelBuffer(gameCanvas));
	    // Toggle fullscreen by double-click on canvas.
	    gameCanvas.addEventListener("dblclick", wutil.toggleFullscreen);
	    const switchToGameAndPlay = () => {
	        if (GameGui_1.switchHtmlLayer(gui, GameGui_1.GameLayerId.Game)) {
	            startGame_1.startGame(gameCanvas, gui);
	        }
	    };
	    gui.get(GameGui_1.GameLayerId.Menu).addEventListener("click", switchToGameAndPlay);
	    gui.get(GameGui_1.GameLayerId.GameOver).addEventListener("click", switchToGameAndPlay);
	}
	//-------------------------------------------------------------------------------------------------------------------
	main();


/***/ }),
/* 45 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Resize canvas pixel buffer to fit the CSS size of the element.
	 * @param canvas
	 */
	function resizeCanvasPixelBuffer(canvas) {
	    canvas.width = Math.round(canvas.clientWidth * window.devicePixelRatio);
	    canvas.height = Math.round(canvas.clientHeight * window.devicePixelRatio);
	}
	exports.resizeCanvasPixelBuffer = resizeCanvasPixelBuffer;
	//···················································································································
	function toggleFullscreen() {
	    if (document.documentElement.requestFullscreen) {
	        if (document.fullscreenElement)
	            document.exitFullscreen();
	        else
	            document.documentElement.requestFullscreen();
	    }
	}
	exports.toggleFullscreen = toggleFullscreen;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/*******************************************************************************
	 * Copyright 2015 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	var Constructor_1 = __webpack_require__(13);
	/**
	 * Base class for all components. A Component is intended as a data holder
	 * and provides data to be processed in an EntitySystem.
	 */
	var Component = /** @class */ (function () {
	    function Component() {
	        this; //fixme: bug in istanbul
	    }
	    /**
	     * @return The class of this component.
	     */
	    Component.prototype.getComponentClass = function () {
	        return Constructor_1.Constructor.getFor(this);
	    };
	    /**
	     * Check if this component matches the specified class.
	     *
	     * @param clazz The class to compare with.
	     * @return true if it matches.
	     */
	    Component.prototype.is = function (clazz) {
	        return Constructor_1.Constructor.getFor(this) === clazz;
	    };
	    return Component;
	}());
	exports.Component = Component;
	//# sourceMappingURL=Component.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2015 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Entity_1 = __webpack_require__(20);
	var UniqueType_1 = __webpack_require__(5);
	var Family_1 = __webpack_require__(21);
	var typed_signals_1 = __webpack_require__(23);
	var Lookup_1 = __webpack_require__(22);
	var DelayedOperationHandler_1 = __webpack_require__(54);
	function compareSystems(a, b) {
	    return a.getPriority() - b.getPriority();
	}
	/**
	 *  A simple entity signal.
	 */
	var EntitySignal = /** @class */ (function (_super) {
	    __extends(EntitySignal, _super);
	    function EntitySignal() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return EntitySignal;
	}(typed_signals_1.Signal));
	exports.EntitySignal = EntitySignal;
	/**
	 * The heart of the Entity framework. It is responsible for keeping track of Entity and
	 * managing EntitySystem objects. The Engine should be updated every tick via the update(float) method.
	 *
	 * With the Engine you can:
	 *
	 * - Create entities using createEntity()
	 * - Add/Remove Entity objects
	 * - Add/Remove {@link EntitySystem}s
	 * - Obtain a list of entities for a specific Family
	 * - Update the main loop
	 * - Connect to/Disconnect from EntitySignal
	 */
	var Engine = /** @class */ (function () {
	    /**
	     * Creates a new Engine.
	     */
	    function Engine() {
	        this.entities = [];
	        this.entitiesById = {};
	        this.systems = [];
	        this.systemsByType = {};
	        this.entitiesByFamily = {};
	        this.entityAddedSignals = {};
	        this.entityRemovedSignals = {};
	        this.updating = false;
	        this.notifying = false;
	        this.nextEntityId = 1;
	        this.entityFamilyUpdates = [];
	        // private systemOperationHandler: DelayedOperationHandler<EntitySystem>;
	        /** Will dispatch an event when an entity is added. */
	        this.entityAdded = new EntitySignal();
	        /** Will dispatch an event when an entity is removed. */
	        this.entityRemoved = new EntitySignal();
	        /** Store and look up instances of classes. */
	        this.lookup = new Lookup_1.Lookup();
	        this.entityOperationHandler = new DelayedOperationHandler_1.DelayedOperationHandler({
	            onAdd: this.addEntityInternal.bind(this),
	            onRemove: this.removeEntityInternal.bind(this),
	            onRemoveAll: this.removeAllEntitiesInternal.bind(this)
	        });
	        // this.systemOperationHandler = new DelayedOperationHandler({
	        // 	onAdd: this.addSystemInternal.bind(this),
	        // 	onRemove: this.removeSystemInternal.bind(this),
	        // 	onRemoveAll: this.removeAllSystemsInternal.bind(this)
	        // });
	    }
	    /**
	     * @return true if this engine is currently updating systems.
	     */
	    Engine.prototype.isUpdating = function () {
	        return this.updating;
	    };
	    /**
	     * Remove all entities and systems.
	     */
	    Engine.prototype.destroy = function () {
	        do {
	            this.removeAllEntities();
	            this.processEntityFamilyUpdates();
	            this.entityOperationHandler.process();
	        } while (this.entities.length);
	        this.removeAllSystems();
	    };
	    /** @return A new Entity. In order to add it to the Engine, use addEntity(Entity). */
	    Engine.prototype.createEntity = function () {
	        return new Entity_1.Entity();
	    };
	    /**
	     * Creates and assembles an Entity using the EntityFactory.
	     * In order to add it to the Engine, use addEntity().
	     * setEntityFactory must be called before first use.
	     *
	     * @param blueprintname The name of the entity blueprint
	     * @return A fully assembled Entity or null if the assembly failed.
	     */
	    Engine.prototype.assembleEntity = function (blueprintname, overrides) {
	        if (this.entityFactory) {
	            var entity = this.createEntity();
	            if (this.entityFactory.assemble(entity, blueprintname, overrides)) {
	                return entity;
	            }
	            entity.removeAll();
	        }
	        return null;
	    };
	    /**
	     * Set the EntityFactory to use with assembleEntity.
	     *
	     * @param entityFactory The new EntityFactory
	     */
	    Engine.prototype.setEntityFactory = function (entityFactory) {
	        this.entityFactory = entityFactory;
	    };
	    /**
	     * Adds an entity to this Engine.
	     *
	     * @param entity the entity to add
	     */
	    Engine.prototype.addEntity = function (entity) {
	        if (entity.uuid != 0)
	            throw "Entity already added to an engine";
	        entity.uuid = this.obtainEntityId();
	        entity.engine = this;
	        if (this.updating || this.notifying)
	            this.entityOperationHandler.add(entity);
	        else
	            this.addEntityInternal(entity);
	    };
	    /**
	     * Removes an entity from this Engine.
	     *
	     * @param entity the entity to remove
	     */
	    Engine.prototype.removeEntity = function (entity) {
	        if (this.updating || this.notifying) {
	            if (entity.scheduledForRemoval)
	                return;
	            entity.scheduledForRemoval = true;
	            this.entityOperationHandler.remove(entity);
	        }
	        else {
	            entity.scheduledForRemoval = true;
	            this.removeEntityInternal(entity);
	        }
	    };
	    /**
	     * Removes all entities registered with this Engine.
	     */
	    Engine.prototype.removeAllEntities = function () {
	        if (this.updating || this.notifying) {
	            for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
	                var entity = _a[_i];
	                entity.scheduledForRemoval = true;
	            }
	            this.entityOperationHandler.removeAll();
	        }
	        else {
	            while (this.entities.length) {
	                this.removeEntity(this.entities[0]);
	            }
	        }
	    };
	    /**
	     * @param id The id of an Entity
	     * @return The entity associated with the specified id or null if no such entity exists.
	     */
	    Engine.prototype.getEntity = function (id) {
	        return this.entitiesById[id] || null;
	    };
	    /** @return A list of all entities */
	    Engine.prototype.getEntities = function () {
	        return this.entities;
	    };
	    /**
	     * Adds the EntitySystem to this Engine.
	     *
	     * @typeparam T The entity system class
	     * @param system The EntitySystem to add
	     */
	    Engine.prototype.addSystem = function (system) {
	        var systemType = UniqueType_1.UniqueType.getForInstance(system);
	        var systemTypeIndex = systemType.getIndex();
	        this.removeSystemInternal(systemType);
	        this.systems.push(system);
	        this.systemsByType[systemTypeIndex] = system;
	        system.addedToEngine(this);
	        this.sortSystems();
	        return system;
	    };
	    /**
	     * Removes the EntitySystem from this Engine.
	     *
	     * @param clazz The System class to remove
	     */
	    Engine.prototype.removeSystem = function (clazz) {
	        this.removeSystemInternal(UniqueType_1.UniqueType.getForClass(clazz));
	    };
	    /**
	     * Removes all systems registered with this Engine.
	     */
	    Engine.prototype.removeAllSystems = function () {
	        for (var _i = 0, _a = this.systems; _i < _a.length; _i++) {
	            var system = _a[_i];
	            system.removedFromEngine(this);
	        }
	        this.systems = [];
	        this.systemsByType = {};
	    };
	    /**
	     * Sort all systems (usually done letmatically, except if you override EntitySystem.getPriority())
	     */
	    Engine.prototype.sortSystems = function () {
	        this.systems.sort(compareSystems);
	    };
	    /**
	     * Removes the EntitySystem from this Engine.
	     *
	     * @param type The EntitySystem type to remove
	     */
	    Engine.prototype.removeSystemInternal = function (type) {
	        var index = type.getIndex();
	        var system = this.systemsByType[index];
	        if (system) {
	            delete this.systemsByType[index];
	            var index2 = this.systems.indexOf(system);
	            /* istanbul ignore else: this will never happen */
	            if (index2 !== -1)
	                this.systems.splice(index2, 1);
	            system.removedFromEngine(this);
	        }
	    };
	    /**
	     * Quick EntitySystem retrieval.
	     *
	     * @typeparam T The entity system class
	     * @param clazz The EntitySystem class
	     * @return The EntitySystem of the specified class, or null if no such system exists.
	     */
	    Engine.prototype.getSystem = function (clazz) {
	        var type = UniqueType_1.UniqueType.getForClass(clazz);
	        var index = type.getIndex();
	        return this.systemsByType[index] || null;
	    };
	    /**
	     * @return A list of all entity systems managed by the Engine.
	     */
	    Engine.prototype.getSystems = function () {
	        return this.systems;
	    };
	    /**
	     * @param family A Family instance
	     * @return A list of entities for the specified Family. Will return the same instance every time.
	     */
	    Engine.prototype.getEntitiesFor = function (family) {
	        return this.registerFamily(family);
	    };
	    /**
	     * @param family A Family instance
	     * @return The EntitySignal which emits when an entity is added to the specified Family
	     */
	    Engine.prototype.getEntityAddedSignal = function (family) {
	        this.registerFamily(family);
	        var index = family.uniqueType.getIndex();
	        var signal = this.entityAddedSignals[index];
	        if (!signal)
	            signal = this.entityAddedSignals[index] = new EntitySignal();
	        return signal;
	    };
	    /**
	     * @param family A Family instance
	     * @return The EntitySignal which emits when an entity is removed from the specified Family
	     */
	    Engine.prototype.getEntityRemovedSignal = function (family) {
	        this.registerFamily(family);
	        var index = family.uniqueType.getIndex();
	        var signal = this.entityRemovedSignals[index];
	        if (!signal)
	            signal = this.entityRemovedSignals[index] = new EntitySignal();
	        return signal;
	    };
	    /**
	     * Updates all the systems in this Engine.
	     *
	     * @param deltaTime The time passed since the last frame.
	     */
	    Engine.prototype.update = function (deltaTime) {
	        this.updating = true;
	        for (var _i = 0, _a = this.systems; _i < _a.length; _i++) {
	            var system = _a[_i];
	            if (system.checkProcessing())
	                system.update(deltaTime);
	            this.processEntityFamilyUpdates();
	            this.entityOperationHandler.process();
	        }
	        this.updating = false;
	    };
	    Engine.prototype.obtainEntityId = function () {
	        return this.nextEntityId++;
	    };
	    /**
	     * Request the update of an entities family bits. For internal use.
	     *
	     * @param entity The entity to update
	     */
	    Engine.prototype.requestFamilyUpdate = function (entity) {
	        if (this.updating || this.notifying)
	            this.entityFamilyUpdates.push(entity);
	        else
	            this.updateFamilyMembership(entity);
	    };
	    Engine.prototype.processEntityFamilyUpdates = function () {
	        var entity;
	        while (entity = this.entityFamilyUpdates.pop()) {
	            this.updateFamilyMembership(entity);
	        }
	    };
	    Engine.prototype.updateFamilyMembership = function (entity) {
	        if (entity.scheduledForRemoval || !entity.isValid())
	            return;
	        for (var key in this.entitiesByFamily) {
	            var family = Family_1.Family.getByIndex(parseInt(key));
	            /* istanbul ignore if: this will never happen */
	            if (!family)
	                continue;
	            var familyEntities = this.entitiesByFamily[key];
	            var familyIndex = family.uniqueType.getIndex();
	            var belongsToFamily = entity.getFamilyBits().get(familyIndex);
	            var matches = family.matches(entity);
	            if (!belongsToFamily && matches) {
	                familyEntities.push(entity);
	                entity.familyBits.set(familyIndex);
	                this.notifyFamilyListenersAdd(family, entity);
	            }
	            else if (belongsToFamily && !matches) {
	                var index = familyEntities.indexOf(entity);
	                /* istanbul ignore else: this will never happen */
	                if (index !== -1)
	                    familyEntities.splice(index, 1);
	                entity.familyBits.clear(familyIndex);
	                this.notifyFamilyListenersRemove(family, entity);
	            }
	        }
	    };
	    Engine.prototype.removeEntityInternal = function (entity) {
	        // Check if entity is able to be removed (id == 0 means the entity has not been added to the engine yet)
	        if (entity.getId() == 0) {
	            entity.removeAll();
	            return;
	        }
	        var index = this.entities.indexOf(entity);
	        if (index === -1)
	            throw "Entity does not belong to this engine";
	        this.entities.splice(index, 1);
	        delete this.entitiesById[entity.getId()];
	        if (!entity.getFamilyBits().isEmpty()) {
	            for (var key in this.entitiesByFamily) {
	                var family = Family_1.Family.getByIndex(parseInt(key));
	                /* istanbul ignore if: this will never happen */
	                if (!family)
	                    continue;
	                var familyEntities = this.entitiesByFamily[key];
	                if (family.matches(entity)) {
	                    var index2 = familyEntities.indexOf(entity);
	                    /* istanbul ignore else: this will never happen */
	                    if (index2 !== -1)
	                        familyEntities.splice(index2, 1);
	                    entity.familyBits.clear(family.uniqueType.getIndex());
	                    this.notifyFamilyListenersRemove(family, entity);
	                }
	            }
	        }
	        this.notifying = true;
	        this.entityRemoved.emit(entity);
	        this.notifying = false;
	        entity.removeAll();
	        entity.engine = this;
	    };
	    Engine.prototype.removeAllEntitiesInternal = function () {
	        var entities = this.getEntities();
	        while (entities.length) {
	            this.removeEntityInternal(entities[entities.length - 1]);
	        }
	    };
	    Engine.prototype.addEntityInternal = function (entity) {
	        this.entities.push(entity);
	        this.entitiesById[entity.getId()] = entity;
	        this.updateFamilyMembership(entity);
	        this.notifying = true;
	        this.entityAdded.emit(entity);
	        this.notifying = false;
	    };
	    Engine.prototype.notifyFamilyListenersAdd = function (family, entity) {
	        var signal = this.entityAddedSignals[family.uniqueType.getIndex()];
	        if (signal) {
	            this.notifying = true;
	            signal.emit(entity);
	            this.notifying = false;
	        }
	    };
	    Engine.prototype.notifyFamilyListenersRemove = function (family, entity) {
	        var signal = this.entityRemovedSignals[family.uniqueType.getIndex()];
	        if (signal) {
	            this.notifying = true;
	            signal.emit(entity);
	            this.notifying = false;
	        }
	    };
	    Engine.prototype.registerFamily = function (family) {
	        var familyIndex = family.uniqueType.getIndex();
	        var entities = this.entitiesByFamily[familyIndex];
	        if (entities)
	            return entities;
	        var familyEntities = this.entitiesByFamily[familyIndex];
	        if (!familyEntities)
	            familyEntities = this.entitiesByFamily[familyIndex] = [];
	        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
	            var e = _a[_i];
	            if (family.matches(e)) {
	                familyEntities.push(e);
	                e.familyBits.set(familyIndex);
	            }
	        }
	        return familyEntities;
	    };
	    return Engine;
	}());
	exports.Engine = Engine;
	//# sourceMappingURL=Engine.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*******************************************************************************
	* Copyright 2015 See AUTHORS file.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*   http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	******************************************************************************/
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var EntitySystem_1 = __webpack_require__(4);
	/**
	 * A simple EntitySystem that processes a Family of entities not once per frame, but after a given interval.
	 * Entity processing logic should be placed in processEntity().
	 */
	var IntervalIteratingSystem = /** @class */ (function (_super) {
	    __extends(IntervalIteratingSystem, _super);
	    /**
	     * @param family Represents the collection of family the system should process
	     * @param interval time in seconds between calls to updateInterval().
	     * @param priority The priority to execute this system with (lower means higher priority).
	     */
	    function IntervalIteratingSystem(family, interval, priority) {
	        if (priority === void 0) { priority = 0; }
	        var _this = _super.call(this, priority) || this;
	        _this.entities = [];
	        _this.accumulator = 0;
	        _this.family = family;
	        _this.interval = interval;
	        return _this;
	    }
	    IntervalIteratingSystem.prototype.addedToEngine = function (engine) {
	        _super.prototype.addedToEngine.call(this, engine);
	        this.entities = engine.getEntitiesFor(this.family);
	    };
	    IntervalIteratingSystem.prototype.removedFromEngine = function (engine) {
	        _super.prototype.removedFromEngine.call(this, engine);
	        this.entities = [];
	    };
	    /**
	     * The processing logic of the system should be placed here.
	     */
	    IntervalIteratingSystem.prototype.updateInterval = function () {
	        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
	            var entity = _a[_i];
	            this.processEntity(entity);
	        }
	    };
	    /** @return A list of entities processed by the system */
	    IntervalIteratingSystem.prototype.getEntities = function () {
	        return this.entities;
	    };
	    /** @return The Family used when the system was created */
	    IntervalIteratingSystem.prototype.getFamily = function () {
	        return this.family;
	    };
	    /** @return time in seconds between calls to updateInterval(). */
	    IntervalIteratingSystem.prototype.getInterval = function () {
	        return this.interval;
	    };
	    IntervalIteratingSystem.prototype.update = function (deltaTime) {
	        this.accumulator += deltaTime;
	        while (this.accumulator >= this.interval) {
	            this.accumulator -= this.interval;
	            this.updateInterval();
	        }
	    };
	    return IntervalIteratingSystem;
	}(EntitySystem_1.EntitySystem));
	exports.IntervalIteratingSystem = IntervalIteratingSystem;
	//# sourceMappingURL=IntervalIteratingSystem.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*******************************************************************************
	* Copyright 2015 See AUTHORS file.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*   http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	******************************************************************************/
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var EntitySystem_1 = __webpack_require__(4);
	/**
	 * A simple EntitySystem that does not run its update logic every call to update(float), but after a
	 * given interval. The actual logic should be placed in updateInterval().
	 */
	var IntervalSystem = /** @class */ (function (_super) {
	    __extends(IntervalSystem, _super);
	    /**
	     * @param interval time in seconds between calls to updateInterval().
	     * @param priority The priority to execute this system with (lower means higher priority).
	     */
	    function IntervalSystem(interval, priority) {
	        if (priority === void 0) { priority = 0; }
	        var _this = _super.call(this, priority) || this;
	        _this.accumulator = 0;
	        _this.interval = interval;
	        return _this;
	    }
	    /** @return time in seconds between calls to updateInterval(). */
	    IntervalSystem.prototype.getInterval = function () {
	        return this.interval;
	    };
	    IntervalSystem.prototype.update = function (deltaTime) {
	        this.accumulator += deltaTime;
	        while (this.accumulator >= this.interval) {
	            this.accumulator -= this.interval;
	            this.updateInterval();
	        }
	    };
	    return IntervalSystem;
	}(EntitySystem_1.EntitySystem));
	exports.IntervalSystem = IntervalSystem;
	//# sourceMappingURL=IntervalSystem.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*******************************************************************************
	* Copyright 2015 See AUTHORS file.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*   http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	******************************************************************************/
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var EntitySystem_1 = __webpack_require__(4);
	/**
	 * A simple EntitySystem that iterates over each entity and calls processEntity() for each entity every time the
	 * EntitySystem is updated. This is really just a convenience class as most systems iterate over a list of entities.
	 */
	var IteratingSystem = /** @class */ (function (_super) {
	    __extends(IteratingSystem, _super);
	    /**
	     * @param family The family of entities iterated over in this System
	     * @param priority The priority to execute this system with (lower means higher priority).
	     */
	    function IteratingSystem(family, priority) {
	        if (priority === void 0) { priority = 0; }
	        var _this = _super.call(this, priority) || this;
	        _this.entities = [];
	        _this.family = family;
	        return _this;
	    }
	    IteratingSystem.prototype.update = function (deltaTime) {
	        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
	            var entity = _a[_i];
	            this.processEntity(entity, deltaTime);
	        }
	    };
	    IteratingSystem.prototype.addedToEngine = function (engine) {
	        _super.prototype.addedToEngine.call(this, engine);
	        this.entities = engine.getEntitiesFor(this.family);
	    };
	    IteratingSystem.prototype.removedFromEngine = function (engine) {
	        _super.prototype.removedFromEngine.call(this, engine);
	        this.entities = [];
	    };
	    /** @return A list of entities processed by the system */
	    IteratingSystem.prototype.getEntities = function () {
	        return this.entities;
	    };
	    /** @return The Family used when the system was created */
	    IteratingSystem.prototype.getFamily = function () {
	        return this.family;
	    };
	    return IteratingSystem;
	}(EntitySystem_1.EntitySystem));
	exports.IteratingSystem = IteratingSystem;
	//# sourceMappingURL=IteratingSystem.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*******************************************************************************
	* Copyright 2015 See AUTHORS file.
	*
	* Licensed under the Apache License, Version 2.0 (the "License");
	* you may not use this file except in compliance with the License.
	* You may obtain a copy of the License at
	*
	*   http://www.apache.org/licenses/LICENSE-2.0
	*
	* Unless required by applicable law or agreed to in writing, software
	* distributed under the License is distributed on an "AS IS" BASIS,
	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	* See the License for the specific language governing permissions and
	* limitations under the License.
	******************************************************************************/
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var EntitySystem_1 = __webpack_require__(4);
	var typed_signals_1 = __webpack_require__(23);
	/**
	 * Like IteratingSystem, but sorted using a comparator.
	 * It processes each Entity of a given Family in the order specified by a comparator and
	 * calls processEntity() for each Entity every time the EntitySystem is updated. This is really just a convenience
	 * class as rendering systems tend to iterate over a list of entities in a sorted manner. Adding entities will cause
	 * the entity list to be resorted. Call forceSort() if you changed your sorting criteria.
	 */
	var SortedIteratingSystem = /** @class */ (function (_super) {
	    __extends(SortedIteratingSystem, _super);
	    /**
	     * @param family The family of entities iterated over in this System
	     * @param comparator The comparator to sort the entities
	     * @param priority The priority to execute this system with (lower means higher priority).
	     */
	    function SortedIteratingSystem(family, comparator, priority) {
	        if (priority === void 0) { priority = 0; }
	        var _this = _super.call(this, priority) || this;
	        _this.sortedEntities = [];
	        _this.shouldSort = false;
	        _this.connections = new typed_signals_1.SignalConnections();
	        _this.family = family;
	        _this.comparator = comparator;
	        return _this;
	    }
	    /**
	     * Call this if the sorting criteria have changed.
	     * The actual sorting will be delayed until the entities are processed.
	     */
	    SortedIteratingSystem.prototype.forceSort = function () {
	        this.shouldSort = true;
	    };
	    SortedIteratingSystem.prototype.sort = function () {
	        if (this.shouldSort) {
	            this.sortedEntities.sort(this.comparator);
	            this.shouldSort = false;
	        }
	    };
	    SortedIteratingSystem.prototype.entityAdded = function (entity) {
	        this.sortedEntities.push(entity);
	        this.shouldSort = true;
	    };
	    SortedIteratingSystem.prototype.entityRemoved = function (entity) {
	        var index = this.sortedEntities.indexOf(entity);
	        if (index !== -1) {
	            this.sortedEntities.splice(index, 1);
	            this.shouldSort = true;
	        }
	    };
	    SortedIteratingSystem.prototype.addedToEngine = function (engine) {
	        _super.prototype.addedToEngine.call(this, engine);
	        var newEntities = engine.getEntitiesFor(this.family);
	        this.sortedEntities = [];
	        if (newEntities.length) {
	            for (var _i = 0, newEntities_1 = newEntities; _i < newEntities_1.length; _i++) {
	                var entity = newEntities_1[_i];
	                this.sortedEntities.push(entity);
	            }
	            this.sortedEntities.sort(this.comparator);
	        }
	        this.shouldSort = false;
	        this.connections.add(engine.getEntityAddedSignal(this.family).connect(this.entityAdded.bind(this)));
	        this.connections.add(engine.getEntityRemovedSignal(this.family).connect(this.entityRemoved.bind(this)));
	    };
	    SortedIteratingSystem.prototype.removedFromEngine = function (engine) {
	        _super.prototype.removedFromEngine.call(this, engine);
	        this.connections.disconnectAll();
	        this.sortedEntities = [];
	        this.shouldSort = false;
	    };
	    SortedIteratingSystem.prototype.update = function (deltaTime) {
	        this.sort();
	        for (var _i = 0, _a = this.sortedEntities; _i < _a.length; _i++) {
	            var entity = _a[_i];
	            this.processEntity(entity, deltaTime);
	        }
	    };
	    /**
	     * @return The set of entities processed by the system
	     */
	    SortedIteratingSystem.prototype.getEntities = function () {
	        this.sort();
	        return this.sortedEntities;
	    };
	    /** @return The Family used when the system was created */
	    SortedIteratingSystem.prototype.getFamily = function () {
	        return this.family;
	    };
	    return SortedIteratingSystem;
	}(EntitySystem_1.EntitySystem));
	exports.SortedIteratingSystem = SortedIteratingSystem;
	//# sourceMappingURL=SortedIteratingSystem.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2011 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	var emptyOverrides = {};
	/**
	 * Stores the name of a component and key/value pairs to construct the component.
	 * See EntityFactory.
	 */
	var ComponentBlueprint = /** @class */ (function () {
	    /**
	     * Creates a new blueprint with the specified component name
	     *
	     * @param name the name of the component.
	     */
	    function ComponentBlueprint(name) {
	        this.overrides = emptyOverrides;
	        this.values = {};
	        this.name = name;
	    }
	    /**
	     * Set the overrides map
	     *
	     * @param overrides the overrides to use on the next get* calls
	     */
	    ComponentBlueprint.prototype.setOverrides = function (overrides) {
	        this.overrides = overrides || emptyOverrides;
	    };
	    /**
	     * Set a key/value pair
	     *
	     * @param key the key
	     * @param value the value
	     */
	    ComponentBlueprint.prototype.set = function (key, value) {
	        this.values[key] = value;
	    };
	    /**
	     * Get a boolean value
	     *
	     * @param key the key
	     * @param defaultValue the value to return if no value exists for key.
	     * @return The corresponding value or defaultValue if none exists.
	     */
	    ComponentBlueprint.prototype.getBool = function (key, defaultValue) {
	        if (this.overrides.hasOwnProperty(key)) {
	            var value = this.overrides[key];
	            if (value === true || value === false)
	                return value;
	        }
	        if (this.values.hasOwnProperty(key)) {
	            var value = this.values[key];
	            if (value === true || value === false)
	                return value;
	        }
	        return defaultValue;
	    };
	    /**
	     * Get an integer value
	     *
	     * @param key the key
	     * @param defaultValue the value to return if no value exists for key.
	     * @return The corresponding value or defaultValue if none exists.
	     */
	    ComponentBlueprint.prototype.getNumber = function (key, defaultValue) {
	        if (this.overrides.hasOwnProperty(key)) {
	            var value = this.overrides[key];
	            if (typeof (value) === "number")
	                return value;
	        }
	        if (this.values.hasOwnProperty(key)) {
	            var value = this.values[key];
	            if (typeof (value) === "number")
	                return value;
	        }
	        return defaultValue;
	    };
	    /**
	     * Get a string value
	     *
	     * @param key the key
	     * @param defaultValue the value to return if no value exists for key.
	     * @return The corresponding value or defaultValue if none exists.
	     */
	    ComponentBlueprint.prototype.getString = function (key, defaultValue) {
	        if (this.overrides.hasOwnProperty(key)) {
	            var value = this.overrides[key];
	            if (typeof (value) === "string")
	                return value;
	        }
	        if (this.values.hasOwnProperty(key)) {
	            var value = this.values[key];
	            if (typeof (value) === "string")
	                return value;
	        }
	        return defaultValue;
	    };
	    /**
	     * Get any type of value
	     *
	     * @param key the key
	     * @param defaultValue the value to return if no value exists for key.
	     * @return The corresponding value or defaultValue if none exists.
	     */
	    ComponentBlueprint.prototype.getAny = function (key, defaultValue) {
	        if (this.overrides.hasOwnProperty(key))
	            return this.overrides[key];
	        if (this.values.hasOwnProperty(key))
	            return this.values[key];
	        return defaultValue;
	    };
	    return ComponentBlueprint;
	}());
	exports.ComponentBlueprint = ComponentBlueprint;
	/**
	 * Stores a list of {@link ComponentBlueprint}s needed to construct an Entity.
	 * See EntityFactory.
	 */
	var EntityBlueprint = /** @class */ (function () {
	    function EntityBlueprint() {
	        /** The component blueprints to use */
	        this.components = [];
	    }
	    /** @param blueprint shared_ptr to a ComponentBlueprint. */
	    EntityBlueprint.prototype.add = function (blueprint) {
	        this.components.push(blueprint);
	    };
	    return EntityBlueprint;
	}());
	exports.EntityBlueprint = EntityBlueprint;
	//# sourceMappingURL=Blueprint.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2011 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Component factory interface. Used to construct {@link Component}s from {@link ComponentBlueprint}s.
	 */
	var ComponentFactory = /** @class */ (function () {
	    function ComponentFactory() {
	    }
	    return ComponentFactory;
	}());
	exports.ComponentFactory = ComponentFactory;
	/**
	 * A template ComponentFactory implementation for simple components
	 * which don't need to read data from the blueprint.
	 */
	var SimpleComponentFactory = /** @class */ (function (_super) {
	    __extends(SimpleComponentFactory, _super);
	    /** Default constructor */
	    function SimpleComponentFactory(componentClass) {
	        var _this = _super.call(this) || this;
	        _this.componentClass = componentClass;
	        return _this;
	    }
	    /**
	     * Assemble a component for an entity.
	     *
	     * @param entity the entity to add the component to
	     * @param blueprint the blueprint will be ignored
	     */
	    SimpleComponentFactory.prototype.assemble = function (entity, blueprint) {
	        return !!entity.add(new this.componentClass());
	    };
	    return SimpleComponentFactory;
	}(ComponentFactory));
	exports.SimpleComponentFactory = SimpleComponentFactory;
	//# sourceMappingURL=ComponentFactory.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2015 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	var DelayedOperationType;
	(function (DelayedOperationType) {
	    DelayedOperationType[DelayedOperationType["Add"] = 0] = "Add";
	    DelayedOperationType[DelayedOperationType["Remove"] = 1] = "Remove";
	    DelayedOperationType[DelayedOperationType["RemoveAll"] = 2] = "RemoveAll";
	})(DelayedOperationType || (DelayedOperationType = {}));
	var DelayedOperation = /** @class */ (function () {
	    function DelayedOperation(type, entry) {
	        this.entry = null;
	        this.nextOperation = null;
	        this.type = type;
	        this.entry = entry;
	    }
	    return DelayedOperation;
	}());
	/**
	 * A class to help delaying add/remove/removeAll operations during engine updates.
	 *
	 * @typeparam T The entry class
	 */
	var DelayedOperationHandler = /** @class */ (function () {
	    /**
	     * @param listener The listener callbacks
	     */
	    function DelayedOperationHandler(listener) {
	        this.nextOperation = null;
	        this.lastOperation = null;
	        this.listener = listener;
	    }
	    /**
	     * Process all scheduled add/remove/removeAll operations
	     */
	    DelayedOperationHandler.prototype.process = function () {
	        while (this.nextOperation) {
	            var operation = this.nextOperation;
	            switch (operation.type) {
	                case DelayedOperationType.Add:
	                    if (operation.entry)
	                        this.listener.onAdd(operation.entry);
	                    break;
	                case DelayedOperationType.Remove:
	                    if (operation.entry)
	                        this.listener.onRemove(operation.entry);
	                    break;
	                case DelayedOperationType.RemoveAll:
	                    this.listener.onRemoveAll();
	                    break;
	                default:
	                    throw "Unexpected Operation type: " + operation.type;
	            }
	            this.nextOperation = operation.nextOperation;
	        }
	        this.nextOperation = null;
	        this.lastOperation = null;
	    };
	    DelayedOperationHandler.prototype.schedule = function (type, entry) {
	        var operation = new DelayedOperation(type, entry);
	        if (this.lastOperation)
	            this.lastOperation.nextOperation = operation;
	        else
	            this.nextOperation = operation;
	        this.lastOperation = operation;
	    };
	    /**
	     * Schedule an add operation
	     *
	     * @param entry the entry to add
	     */
	    DelayedOperationHandler.prototype.add = function (entry) {
	        this.schedule(DelayedOperationType.Add, entry);
	    };
	    /**
	     * Schedule a remove operation
	     *
	     * @param entry the entry to remove
	     */
	    DelayedOperationHandler.prototype.remove = function (entry) {
	        this.schedule(DelayedOperationType.Remove, entry);
	    };
	    /**
	     * Schedule a removeAll operation
	     */
	    DelayedOperationHandler.prototype.removeAll = function () {
	        this.schedule(DelayedOperationType.RemoveAll, null);
	    };
	    return DelayedOperationHandler;
	}());
	exports.DelayedOperationHandler = DelayedOperationHandler;
	//# sourceMappingURL=DelayedOperationHandler.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	"use strict";
	/*******************************************************************************
	 * Copyright 2011 See AUTHORS file.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 ******************************************************************************/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * A factory to create {@link Entity entities} from blueprints.
	 */
	var EntityFactory = /** @class */ (function () {
	    function EntityFactory() {
	        this.componentFactories = {};
	        this.entities = {};
	    }
	    /**
	     * Add a component factory
	     *
	     * @param name the name used to identify a Component
	     * @param factory the factory to use
	     */
	    EntityFactory.prototype.addComponentFactory = function (name, factory) {
	        this.componentFactories[name] = factory;
	    };
	    /**
	     * @param name the name used to identify the EntityBlueprint
	     * @param blueprint the blueprint
	     */
	    EntityFactory.prototype.addEntityBlueprint = function (name, blueprint) {
	        this.entities[name] = blueprint;
	    };
	    /**
	     * Add all {@link Component}s found in a blueprint to the supplied entity.
	     *
	     * @param entity the entity to add the {@link Component}s to.
	     * @param blueprintname the name used to identify the EntityBlueprint
	     * @return true on success.
	     */
	    EntityFactory.prototype.assemble = function (entity, blueprintname, overrides) {
	        var blueprint = this.entities[blueprintname];
	        var success = false;
	        if (blueprint) {
	            success = true;
	            for (var _i = 0, _a = blueprint.components; _i < _a.length; _i++) {
	                var componentBlueprint = _a[_i];
	                var factory = this.componentFactories[componentBlueprint.name];
	                componentBlueprint.setOverrides(overrides && overrides[componentBlueprint.name]);
	                if (!factory || !factory.assemble(entity, componentBlueprint)) {
	                    success = false;
	                    console.error('Could not assemble component ' + componentBlueprint.name);
	                }
	                componentBlueprint.setOverrides();
	            }
	        }
	        return success;
	    };
	    return EntityFactory;
	}());
	exports.EntityFactory = EntityFactory;
	//# sourceMappingURL=EntityFactory.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map