<template>
  <div class="main-page">
    <div class="control">
      <button @click="addCriteria()">Добавить критерий</button>
      <button @click="addOption()">Добавить вариант</button>
    </div>

    <table v-if="criteriasLength != 0 || optionsLength != 0">
      <thead>
        <th>Варианты / Критерии</th>
        <th class="criteria" v-for="(criteria, criteria_uuid) in criterias" :key="criteria_uuid">
          <button @click="deleteCriteria(criteria_uuid)">X</button>
          <input @input="editCriteria(criteria_uuid, $event.target.value)" :value="criteria.name" type="text">
        </th>
      </thead>
      <tbody>
        <tr v-for="(option, option_uuid) in options" :key="option_uuid" :class="{ acceptable: option_uuid === acceptableOption }">
          <td class="option">
            <button @click="deleteOption(option_uuid)">X</button>
            <input @input="editOption(option_uuid, $event.target.value)" :value="option.name" type="text">
          </td>
          <td v-for="(criteria, criteria_uuid) in criterias" :key="criteria_uuid">
            <input @input="editOptionCriteria(option_uuid, criteria_uuid, $event.target.value)" v-if="optionCriteria[`${option_uuid}_${criteria_uuid}`]" :value="optionCriteria[`${option_uuid}_${criteria_uuid}`].value" type="text">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
    }
  },
  computed: {
    optionsLength() {
      return Object.keys(this.$store.state.Data.options).length;
    },
    criteriasLength() {
      return Object.keys(this.$store.state.Data.criterias).length;
    },
    options() {
      return this.$store.state.Data.options;
    },
    criterias() {
      return this.$store.state.Data.criterias;
    },
    optionCriteria() {
      return this.$store.state.Data.optionCriteria;
    },
    criteriaCriteria() {
      return this.$store.state.Data.criteriaCriteria;
    },
    criteriaOptionOption() {
      return this.$store.state.Data.criteriaOptionOption;
    },
    acceptableOption() {
      // Oh yeah boy, that's why we all here

      const criteriaOptionWeight = {};
      
      Object.values(this.criterias).forEach((criteria) => {
        const vectors = {};

        Object.values(this.options).forEach((option) => {
          let vector = 1;

          Object.values(this.options).forEach((compareOption) => {
            vector *= (this.criteriaOptionOption[`${criteria.uuid}_${option.uuid}_${compareOption.uuid}`] || {}).value || 0;
          });

          vectors[option.uuid] = vector ** (1 / Object.keys(this.options).length);
        });

        const vectorSum = Object.values(vectors).reduce((acc, vector) => acc + vector, 0);
        Object.values(this.options).forEach((option) => {
          criteriaOptionWeight[`${criteria.uuid}_${option.uuid}`] = vectors[option.uuid] / vectorSum;
        });

      });

      const criteriaVectors = {};
      const criteriaCriteriaWeight = {};

      Object.values(this.criterias).forEach((criteria) => {
        let vector = 1;

        Object.values(this.criterias).forEach((compareCriteria) => {
          vector *= (this.criteriaCriteria[`${criteria.uuid}_${compareCriteria.uuid}`] || {}).value || 0;
        });

        criteriaVectors[criteria.uuid] = vector ** (1 / Object.keys(this.criterias).length);
      });

      const criteriaVectorSum = Object.values(criteriaVectors).reduce((acc, vector) => acc + vector, 0);
      Object.values(this.criterias).forEach((criteria) => {
        criteriaCriteriaWeight[`${criteria.uuid}`] = criteriaVectors[criteria.uuid] / criteriaVectorSum;
      });

      const optionIntegral = {};

      Object.values(this.options).forEach((option) => {
        let integral = 1;

        Object.values(this.criterias).forEach((criteria) => {
          integral += criteriaOptionWeight[`${criteria.uuid}_${option.uuid}`] * criteriaCriteriaWeight[criteria.uuid];
        });

        optionIntegral[option.uuid] = integral;
      });

      const acceptable = Object.entries(optionIntegral).reduce((acc, [key, value]) => {
        if (value > acc[1]) {
          return [key, value];
        }

        return acc;
      }, [0, 0])

      return acceptable[0];
    },
  },
  methods: {
    addOption() {
      this.$store.dispatch('addOption', {
        name: 'Новый вариант',
      }).then(({ uuid }) => {

        Object.values(this.criterias).forEach((criteria) => {
          this.$store.dispatch('editOptionCriteria', {
            optionUuid: uuid,
            criteriaUuid: criteria.uuid,
            data: {
              value: 1,
            }
          });

          Object.values(this.options).forEach((option) => {
            this.$store.dispatch('editCriteriaOptionOption', {
              optionUuid: uuid,
              compareOptionUuid: option.uuid,
              criteriaUuid: criteria.uuid,
              data: {
                value: 1,
              },
            });

            this.$store.dispatch('editCriteriaOptionOption', {
              optionUuid: option.uuid,
              compareOptionUuid: uuid,
              criteriaUuid: criteria.uuid,
              data: {
                value: 1,
              },
            });

          });
        });
      });
    },
    addCriteria() {
      this.$store.dispatch('addCriteria', {
        name: 'Новый критерий',
      }).then(({ uuid }) => {

        Object.values(this.options).forEach((option) => {
          this.$store.dispatch('editOptionCriteria', {
            optionUuid: option.uuid,
            criteriaUuid: uuid,
            data: {
              value: 1,
            }
          });

          Object.values(this.options).forEach((compareOption) => {
            this.$store.dispatch('editCriteriaOptionOption', {
              optionUuid: option.uuid,
              compareOptionUuid: compareOption.uuid,
              criteriaUuid: uuid,
              data: {
                value: 1,
              },
            });
          });
        });

        Object.values(this.criterias).forEach((criteria) => {
            this.$store.dispatch('editCriteriaCriteria', {
              criteriaUuid: uuid,
              compareCriteriaUuid: criteria.uuid,
              data: {
                value: 1,
              },
            });

            this.$store.dispatch('editCriteriaCriteria', {
              criteriaUuid: criteria.uuid,
              compareCriteriaUuid: uuid,
              data: {
                value: 1,
              },
            });
        });

      });
    },
    editOption(uuid, name) {
      this.$store.dispatch('editOption', { 
        uuid,
        data: {
          name,
        }
      });
    },
    editCriteria(uuid, name) {
      this.$store.dispatch('editCriteria', {
        uuid,
        data: {
          name,
        }
      });
    },
    editOptionCriteria(optionUuid, criteriaUuid, value) {
      this.$store.dispatch('editOptionCriteria', { 
        optionUuid, criteriaUuid,
        data: {
          value,
        }
      });
    },
    deleteOption(uuid) {
      this.$store.dispatch('deleteOption', uuid);
    },
    deleteCriteria(uuid) {
      this.$store.dispatch('deleteCriteria', uuid);
    },
  }
}
</script>

<style lang="scss">

.main-page {
  padding: 40px;
}

.criteria {
  position: relative;
}

.criteria button, .option button {
  position: absolute;
  right: 0;
  padding: 0;
  height: 90%;
  width: 20px;
  border-radius: 0;
}

.option {
  position: relative;
}

.control {
  display: flex;
}

.control button {
  margin-left: 10px;
}

.control button:first-child {
  margin-left: 0px;
}

.acceptable {
  background-color: green;
}

table {
  margin-top: 40px;
}

</style>
