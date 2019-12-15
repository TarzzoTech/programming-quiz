class InstructionBuilder {
    constructor(instruction) {
        this.instruction = instruction;
    }

    getInstance(isNew = true) {
        return {
            Id: isNew ? '' : this.instruction._id,
            CMS: this.instruction.CMS,
            CreatedDate: isNew ? new Date() : this.instruction.CreatedDate,
        };
    }
}

module.exports = {
    InstructionBuilder
};
