import React, { useState, useEffect, SetStateAction } from 'react';

interface Profile {
    firstName: string
    lastName: string
    emailAddress: string
    gender?: string
    testimonial?: string
    age?: number

}

interface Extra {
    [random: string]: string
}

type ProfileExtra = Profile & Extra

export type SomeType = ProfileExtra



export interface Datas {
    fieldName: string
    type: string
    value: string
    options?: string[]
}


export interface ListData extends Array<Datas> { }


export interface payloadEdit {
    fieldName: string
    value: string
}