import { v4 as uuidv4 } from 'uuid';

const state = {
  options: {},
  criterias: {},
  criteriaCriteria: {},
  optionCriteria: {},
  criteriaOptionOption: {},
}

const mutations = {
  EDIT_OPTION(state, { uuid, name }) {
    const option = state.options[uuid];

    if (!option) {
      const newOption = {uuid, name};

      state.options = {
        ...state.options,
        [uuid]: newOption,
      }
    } else {
      option.name = name;
    }
  },
  EDIT_CRITERIA(state, { uuid, name }) {
    const criteria = state.criterias[uuid];

    if (!criteria) {
      const newCriteria = {uuid, name};

      state.criterias = {
        ...state.criterias,
        [uuid]: newCriteria,
      }
    } else {
      criteria.name = name;
    }
  },
  EDIT_CRITERIA_CRITERIA(state, { criteriaUuid, compareCriteriaUuid, value }) {
    const key = `${criteriaUuid}_${compareCriteriaUuid}`
    const criteriaCriteria = state.criteriaCriteria[key];

    if (!criteriaCriteria) {
      const newCriteriaCriteria = { criteriaUuid, compareCriteriaUuid, value };

      state.criteriaCriteria = {
        ...state.criteriaCriteria,
        [key]: newCriteriaCriteria,
      }
    } else {
      criteriaCriteria.value = value;
    }
  },
  EDIT_OPTION_CRITERIA(state, { optionUuid, criteriaUuid, value }) {
    const key = `${optionUuid}_${criteriaUuid}`;
    const optionCriteria = state.optionCriteria[key];

    if(!optionCriteria) {
      const newOptionCriteria = {
        optionUuid, criteriaUuid, value,
      };

      state.optionCriteria = {
        ...state.optionCriteria,
        [key]: newOptionCriteria,
      }
    } else {
      optionCriteria.value = value;
    }
  },
  EDIT_CRITERIA_OPTION_OPTION(state, { criteriaUuid, optionUuid, compareOptionUuid, value }) {
    const key = `${criteriaUuid}_${optionUuid}_${compareOptionUuid}`;
    const criteriaOptionOption = state.criteriaOptionOption[key];

    if(!criteriaOptionOption) {
      const newCriteriaOptionOption = {
        criteriaUuid, optionUuid, compareOptionUuid, value,
      };

      state.criteriaOptionOption = {
        ...state.criteriaOptionOption,
        [key]: newCriteriaOptionOption,
      }
    } else {
      criteriaOptionOption.value = value;
    }
  },
  DELETE_OPTION(state, { uuid }) {
    const newOptions = {};
    Object.entries(state.options).forEach(([key, value]) => {
      if (!key.includes(uuid)) {
        newOptions[key] = value;
      }
    });

    state.options = newOptions;

    const newOptionCriteria = {};
    Object.entries(state.optionCriteria).forEach(([key, value]) => {
      if (!key.includes(uuid)) {
        newOptionCriteria[key] = value;
      }
    });

    state.optionCriteria = newOptionCriteria;

    const newCriteriaOptionOption = {};
    Object.entries(state.criteriaOptionOption).forEach(([key, value]) => {
      if (!key.includes(uuid)) {
        newCriteriaOptionOption[key] = value;
      }
    });

    state.criteriaOptionOption = newCriteriaOptionOption;
  },
  DELETE_CRITERIA(state, { uuid }) {
    const newCriterias = {};
    Object.entries(state.criterias).forEach(([key, value]) => {
      if (!key.includes(uuid)) {
        newCriterias[key] = value;
      }
    });

    console.log(uuid, newCriterias);
    state.criterias = newCriterias;

    const newCriteriaCriteria = {};
    Object.entries(state.criteriaCriteria).forEach(([key, value]) => {
      if (!key.includes(uuid)) {
        newCriteriaCriteria[key] = value;
      }
    });

    state.criteriaCriteria = newCriteriaCriteria;

    const newOptionCriteria = {};
    Object.entries(state.optionCriteria).forEach(([key, value]) => {
      if (!key.includes(uuid)) {
        newOptionCriteria[key] = value;
      }
    });

    state.optionCriteria = newOptionCriteria;

    const newCriteriaOptionOption = {};
    Object.entries(state.criteriaOptionOption).forEach(([key, value]) => {
      if (!key.includes(uuid)) {
        newCriteriaOptionOption[key] = value;
      }
    });

    state.criteriaOptionOption = newCriteriaOptionOption;
  }
}

const actions = {
  async addOption(context, { name }) {
    const uuid = uuidv4();
    context.commit('EDIT_OPTION', { uuid, name });

    return { uuid };
  },
  async addCriteria(context, { name }) {
    const uuid = uuidv4();
    context.commit('EDIT_CRITERIA', { uuid, name });

    return { uuid };
  },
  deleteOption(context, uuid) {
    context.commit('DELETE_OPTION', { uuid });
  },
  deleteCriteria(context, uuid) {
    context.commit('DELETE_CRITERIA', { uuid });
  },
  editOption(context, { uuid, data }) {
    context.commit('EDIT_OPTION', { uuid, ...data });
  },
  editCriteria(context, { uuid, data }) {
    context.commit('EDIT_CRITERIA', { uuid, ...data });
  },
  editCriteriaCriteria(context, { criteriaUuid, compareCriteriaUuid, data }) {
    context.commit('EDIT_CRITERIA_CRITERIA', { criteriaUuid, compareCriteriaUuid, ...data });
  },
  editOptionCriteria(context, { optionUuid, criteriaUuid, data }) {
    context.commit('EDIT_OPTION_CRITERIA', {
      optionUuid, criteriaUuid, ...data,
    });
  },
  editCriteriaOptionOption(context, { criteriaUuid, optionUuid, compareOptionUuid, data }) {
    context.commit('EDIT_CRITERIA_OPTION_OPTION', {
      optionUuid, compareOptionUuid, criteriaUuid, ...data,
    });
  },
}

export default {
  state,
  mutations,
  actions
}
